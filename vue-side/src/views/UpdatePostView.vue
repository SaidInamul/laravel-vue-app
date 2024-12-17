<script setup>
    import { onMounted, reactive } from 'vue'
    import { usePostStore } from '@/stores/post'
    import { useAuthStore } from '@/stores/auth'
    import { useRouter, useRoute } from 'vue-router'
    
    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore()
    const postStore = usePostStore()
    const { show, updatePost } = usePostStore()

    const formData = reactive({
        title: '',
        body: '',
    });
    onMounted(async () => {
        postStore.errors.value = {}
        await show(route.params.id)
        if (authStore.user.id !== postStore.post.value.user_id) {
            router.push({ name: "home" });
        } else {
            formData.title = postStore.post.value.title;
            formData.body = postStore.post.value.body;
        }
    });
</script>

<template>
    <main>
        <h1 class="title">Update your post</h1>
        <form 
        class="w-1/2 mx-auto space-y-6" 
        @submit.prevent="updatePost(formData, postStore.post.value)">
            <div>
                <input
                type="text"
                placeholder="title"
                v-model="formData.title">
                <p v-if="postStore.errors.title" class="error">
                    {{ postStore.errors.title[0]}}
                </p>
            </div>
            <div>
                <textarea rows="7" v-model="formData.body" placeholder="please express whats on mind...">
                </textarea>
            </div>
            <div>
                <button 
                class="primary-btn" 
                type="submit">
                    Post now  🚀
                </button>
            </div>
        </form>
    </main>
</template>