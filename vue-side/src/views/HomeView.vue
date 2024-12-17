<script setup>
import { usePostStore } from '@/stores/post';
import { onMounted } from 'vue';
const { index } = usePostStore()
const postStore = usePostStore()
onMounted(index)
</script>

<template>
    <main class="space-y-16">
        <h1 class="title">Latest post</h1>
        <div class="space-y-10" v-if="postStore.posts.value">
            <div v-for="post in postStore.posts.value" :key="post.id">
                <div class="border-l-2 border-emerald-400 pl-4">
                    <h1 class="text-lg sm:text-2xl font-extrabold text-emerald-900">{{ post.title }}</h1>
                    <p class="text-sm text-emerald-400">Posted by : {{ post.user.name }}</p>
                    <p class="text-xl text-emerald-900">
                        {{ post.teaser }}
                        <router-link :to="{ name: 'show', params: { id: post.id } }" class="font-medium text-emerald-500 text-xl">
                            read more 
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
        <div class="space-y-10" v-else="postStore.errors.value">
            <p>{{ postStore.errors.value }}</p>
        </div>
    </main>
</template>