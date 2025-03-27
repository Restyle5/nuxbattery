<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img
          src="https://scontent.fkul16-1.fna.fbcdn.net/v/t39.30808-1/305496954_572567337744098_2449904515410762394_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=f907e8&_nc_ohc=mK8D8BoHXJgQ7kNvgFNKF5y&_nc_oc=AdmZlJDhdyy2qON2UPAGJUTDtvZnE1nXVS-V9hR0W8lTUEsSKKkRZBnApRIzTInp5twCy_FAqQpianqQwUbVpS25&_nc_zt=24&_nc_ht=scontent.fkul16-1.fna&_nc_gid=oom9ulOgkkNOcEybTuWRvg&oh=00_AYH97HySSS63Z84XmWp995xENO8jJKz2_vov_OZJVPp9Pw&oe=67EA93D9"
          alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
        App
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active rounded" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link rounded" href="/about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link rounded" href="/dashboard">Dashboard</a>
          </li>
          <template v-if="isAuthenticated">
            <li class="nav-item">
              <a class="nav-link rounded" href="/battery/list">Batteries</a>
            </li>
            <li class="nav-item">
              <span  class="nav-link text-danger logout-btn rounded" @click="handleLogout">
                <Icon name="i-lucide-log-out" />
              </span>
            </li>

          </template>
          <template v-else>
            <li class="nav-item">
              <a class="nav-link rounded" href="/login">Login</a>
            </li>
          </template>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import './AppHeader.css'

const router = useRouter()
const route = useRoute()

const isAuthenticated = ref(null)

onMounted(() => {
  checkAuthStatus()
})

// Watch for route changes to re-check authentication status
watch(route, () => {
  checkAuthStatus()
})

// Function to check authentication status
const checkAuthStatus = () => {
  if (process.client) {
    isAuthenticated.value = !!localStorage.getItem('authToken')
  }
}

const handleLogout = () => {
  if (process.client) {
    localStorage.removeItem('authToken')
    isAuthenticated.value = false
  }
  router.push('/login')
}
</script>
