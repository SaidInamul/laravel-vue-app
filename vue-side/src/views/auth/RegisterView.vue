<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

    const formData = reactive({
        name : '',
        email : '',
        password : '',
        password_confirmation : ''
    })
    const { errors } = storeToRefs(useAuthStore())
    const { authenticate } = useAuthStore();
</script>

<template>
    <main>
        <h1 class="title">Create your new account</h1>
        <form 
        class="w-1/2 mx-auto space-y-6" 
        @submit.prevent="authenticate('register', formData)">
            <div>
                <input
                type="text"
                placeholder="Name"
                v-model="formData.name">
                <p v-if="errors.name" class="error">{{ errors.name[0] }}</p>
            </div>
            <div>
                <input
                type="email"
                placeholder="Email"
                v-model="formData.email">
                <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
            </div>
            <div>
                <input
                type="password"
                placeholder="Password"
                v-model="formData.password">
                <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
            </div>
            <div>
                <input
                type="password"
                placeholder="Password Confirmation"
                v-model="formData.password_confirmation">
                <p v-if="errors.password_confirmation" class="error">{{ errors.password_confirmation[0] }}</p>
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