<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore()
const { logout } = useAuthStore();
// onMounted(authStore.getUser)
</script>

<template>
  <header>
    <nav>
      <router-link :to="{ name : 'home' }" class="nav-link">Home</router-link>
      <div v-if="authStore.user" class="flex items-center space-x-6">
        <h3 class="text-white">Welcome, {{ authStore.user.name }}</h3>
        <router-link :to="{ name : 'create' }" class="nav-link">Create post</router-link>
        <form @submit.prevent="logout()">
          <button class="nav-link" type="submit">Logout</button>
        </form>
      </div>
      <div v-else class="space-x-6">
        <router-link :to="{ name : 'register' }" class="nav-link">Register</router-link>
        <router-link :to="{ name : 'login' }" class="nav-link">Login</router-link>
      </div>
    </nav>
  </header>
  <router-view></router-view>
</template> 