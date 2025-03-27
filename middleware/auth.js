export default defineNuxtRouteMiddleware((to, from) => {
  
    if(process.client) {
        const auth = localStorage.getItem("authToken")
        if(!auth){
            return navigateTo('/login')
        }
    }
  })
  