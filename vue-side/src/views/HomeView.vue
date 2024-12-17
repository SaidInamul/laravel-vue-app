<script setup>
import { usePostStore } from '@/stores/post';
// import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const { posts, index } = usePostStore()
onMounted(index)
</script>

<template>
    <main class="space-y-16">
        <h1 class="title">Latest post</h1>
        <div class="space-y-10">
            <div v-for="post in posts.value" :key="post.id" >
                <router-link :to="{ name: 'post', params: { id: post.id } }" class="block">
                    <h1 class="text-lg sm:text-2xl font-extrabold text-emerald-900">{{ post.title }}</h1>
                    <p class="mt-6 text-emerald-500">
                        {{ post.teaser }}
                    </p>
                </router-link>
            </div>
        </div>
    </main>
</template>