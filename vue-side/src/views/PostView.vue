<script setup>
    import { defineProps, onMounted } from 'vue';
    import { usePostStore } from '@/stores/post';

    const props = defineProps({
        id : {
            type : String,
            required : true
        }
    })
    const { post, show } = usePostStore()
    onMounted(async () => {
        await show(props.id)
    });
</script>

<template>
    <main>
        <div v-if="post.value" class="space-y-10">
            <h1 class="title">
                {{ post.value.title }}
            </h1>
            <div class="text-emerald-500 leading-8" v-html="post.value.body"></div>
        </div>
        <div v-else>
            <p>Nothing is here...</p>
        </div>
        
    </main>
    
</template>