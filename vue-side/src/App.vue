<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore()
const { logout } = useAuthStore();
onMounted(authStore.getUser)
</script>

<template>
  <header>
    <nav>
      <router-link :to="{ name : 'home' }" class="nav-link">Home</router-link>
      <form @submit.prevent="logout()" v-if="authStore.user">
          <button class="nav-link" type="submit">Logout</button>
      </form>
      <div v-else>
        <router-link :to="{ name : 'register' }" class="nav-link">Register</router-link>
        <router-link :to="{ name : 'login' }" class="nav-link">Login</router-link>
      </div>
      
    </nav>
  </header>
  <router-view></router-view>
</template> 