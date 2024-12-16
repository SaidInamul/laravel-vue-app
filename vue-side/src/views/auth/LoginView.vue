<script setup>
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

    const { errors } = storeToRefs(useAuthStore())
    const { authenticate } = useAuthStore();
    onMounted(() => errors.value = {})
    const formData = reactive({
        email : '',
        password : ''
    })
</script>

<template>
    <main>
        <h1 class="title">Login to your account</h1>
        <form 
        class="w-1/2 mx-auto space-y-6" 
        @submit.prevent="authenticate('login', formData)">
            <div>
                <input
                type="email"
                placeholder="Email"
                v-model="formData.email">
                <p v-if="errors.email || errors.mismatch" class="error">
                    {{ errors.email ? errors.email[0] : errors.mismatch[0] }}
                </p>
            </div>
            <div>
                <input
                type="password"
                placeholder="Password"
                v-model="formData.password">
                <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
            </div>
            <div>
                <button 
                class="primary-btn" 
                type="submit">
                    Submit
                </button>
            </div>
        </form>
    </main>
</template>