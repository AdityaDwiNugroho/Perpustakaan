export default NuxtAuthHandler({
    callbacks: {
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id;
          session.user.fullname = token.fullname;
          session.user.username = token.username;
          session.user.email = token.email;
          session.user.role = token.role;
          session.user.photo = token.photo;
          session.user.is_verify = token.is_verify;
          session.user.is_active = token.is_active;
          session.user.created_at = token.created_at;
          session.user.updated_at = token.updated_at;
        }
        return session;
      },
    },
  });
  