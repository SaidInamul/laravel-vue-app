<script setup>
    import { onMounted } from 'vue'
    import { usePostStore } from '@/stores/post'
    import { useAuthStore } from '@/stores/auth';
    import { useRoute } from 'vue-router'

    const { show, deletePost } = usePostStore()
    const authStore = useAuthStore();
    const route = useRoute()
    const postStore = usePostStore()
    onMounted(async () => {
        await show(route.params.id)
    });
</script>

<template>
    <main>
        <div v-if="postStore.post.value" class="space-y-8">
            <h1 class="title">
                {{ postStore.post.value.title }}
            </h1>
            <div class="flex items-center justify-center space-x-6">
                <p class="text-center text-sm text-emerald-500">
                    Posted by : {{ postStore.post.value.user?.name || 'Unknown' }}
                </p>
                <div class="flex items-center space-x-6" v-if="authStore.user && authStore.user.id === postStore.post.value.user_id">
                    <form @submit.prevent="deletePost(postStore.post.value)">
                        <button class="text-xl">
                            🗑️
                        </button>
                    </form>
                    <p>✍️</p>
                    <router-link :to="{ name: 'update', params: { id: postStore.post.value.id } }" class="text-xl">
                        ✍️
                    </router-link>
                </div>
            </div>
            <div class="text-emerald-600 leading-8" v-html="postStore.post.value.body"></div>
        </div>
        <div v-else>
            <h1 class="title">
                No post...
            </h1>
        </div>
        
    </main>
    
</template>