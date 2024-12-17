<script setup>
    import { reactive } from 'vue';
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
        @submit.prevent="console.log(formData)">
            <div>
                <input
                type="text"
                placeholder="title"
                v-model="formData.title">
                <!-- <p v-if="errors.title" class="error">
                    {{ errors.email[0]}}
                </p> -->
            </div>
            <div>
                <textarea rows="7" v-model="formData.body" placeholder="please express whats on mind...">
                    
                </textarea>
            </div>
            <div>
                <button 
                class="primary-btn" 
                type="submit">
                    Post now
                </button>
            </div>
        </form>
    </main>
</template>