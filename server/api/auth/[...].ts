import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials' 
import prisma from '~/lib/prisma'
import bcrypt from 'bcrypt'
import { timeAgo } from '~/utils/timeAgo'

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,
    pages: {
        signIn: '/user/login',
        // signOut: '/user/signout',
        // error: '/user/error',
        // verifyRequest: '/user/verify-request',
        // newUser: '/user/registration'
    },

    providers: [
        // @ts-expect-error
        CredentialsProvider.default({
            name: 'credentials',
            credentials: {},
            async authorize(credentials: {
                email: string,
                password: string
            }) {

                // TODO: Fetch user from database
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user) {
                    throw createError({
                        statusCode: 401,
                        statusMessage: 'Unauthorized',
                        // message: 'User not found'
                    })
                }

                const isValid = await bcrypt.compare(credentials.password, user.password)

                if(!isValid) {
                    throw createError({
                        statusCode: 401,
                        statusMessage: 'Unauthorized',
                        // message: 'Password not match'
                    })
                }

                const updatedUser = await prisma.$transaction([
                  prisma.user.update({
                      where: { id: user.id },
                      data: { last_login: new Date() }
                  })
              ]);
            //   console.log("Updated user:", updatedUser);

              

                return { ...user, password: undefined }
            }  
        })
    ],

    session: {
        strategy: 'jwt',
    },

    callbacks: {
        async jwt({token, user, account}) {
            if(user) {
                token = {
                    ...token,
                    ...user,
                    last_login: user.last_login
                  }
                }
                
                return token
              },
              
              async session({session, token}) {
                session.user = {
                  ...token,
                  ...session.user,
                  last_login: token.last_login ? timeAgo(new Date(token.last_login)) : null, 
                }
            
            return session
        }
    }
})