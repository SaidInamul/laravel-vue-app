<script setup>
    import { onMounted, reactive, defineProps } from 'vue'
    import { usePostStore } from '@/stores/post'

    const { updatePost } = usePostStore()
    const useStore = usePostStore()
    onMounted(() => {
        useStore.errors.value = {}
    })
    const props = defineProps({
        id : {
            type : String,
            required : true
        }
    })
    const formData = reactive({
            title : '',
            body : ''
    })
</script>

<template>
    <main>
        <h1 class="title">Create a new post</h1>
        <form 
        class="w-1/2 mx-auto space-y-6" 
        @submit.prevent="storePost(formData)">
            <div>
                <input
                type="text"
                placeholder="title"
                v-model="formData.title">
                <p v-if="useStore.errors.title" class="error">
                    {{ useStore.errors.title[0]}}
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