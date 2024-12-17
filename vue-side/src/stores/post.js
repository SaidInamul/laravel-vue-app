import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostStore = defineStore ('postStore', {
    state : () => {
        return {
            title : '',
            body : '',
            errors : {},
            posts : ref([]),
            post : ref([])
        }
    },
    getters : {},
    actions : {
        // index - view all post
        async index () {
            try {
                const response = await fetch ('/api/posts', {
                    method : 'get',
                })
                const data = await response.json()
                this.posts.value = data
            } catch (error) {
                console.log('Error : ' + error)
            }
        },
        // show - show one post
        async show (id) {
            try {
                const response = await fetch (`/api/posts/${id}`, {
                    method : 'get',
                })
                const data = await response.json()
                this.post.value = data
                this.router.push({name : 'post'})
            } catch (error) {
                console.log('Error : ' + error)
            }
        },
        // store
        async storePost (formData) {
            const response = await fetch ('/api/posts', {
                method : 'post',
                body : JSON.stringify(formData)
            })
            const data = await response.json()
            if (data.errors) {
                this.errors = data.errors
            } else {
                this.title = ''
                this.body = ''
                this.errors = {}
                this.router.push({name : 'home'})
            }
        },
    }
})