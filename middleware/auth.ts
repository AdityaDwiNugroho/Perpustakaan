export default defineNuxtRouteMiddleware((to, from) => {
    const { data, status } = useAuth()
  
    // Debugging
    console.log("Auth Middleware Running - Status:", status.value) 
    if (status.value !== 'authenticated') {
      return navigateTo('/user/login')
    }

  
  })
  