<script setup>
    import { defineProps, onMounted } from 'vue';
    import { usePostStore } from '@/stores/post';
    import { useRoute } from 'vue-router';

    // const props = defineProps({
    //     id : {
    //         type : String,
    //         required : true
    //     }
    // })
    const { show } = usePostStore()
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
            <p class="text-center text-sm text-emerald-500">Posted by : {{ postStore.post.value.user?.name || 'Unknown' }}</p>
            <div class="text-emerald-600 leading-8" v-html="postStore.post.value.body"></div>
        </div>
        <div v-else>
            <h1 class="title">
                No post...
            </h1>
        </div>
        
    </main>
    
</template>