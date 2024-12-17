import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostStore = defineStore ('postStore', {
    state : () => {
        return {
            title : '',
            body : '',
            errors : ref({}),
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
                this.errors = error
            }
        },
        // show - show one post
        async show (id) {
            try {
                const response = await fetch (`/api/posts/${id}`, {
                    method : 'get',
                })
                const data = await response.json()
                this.post.value = data.post
            } catch (error) {
                console.log('Error : ' + error)
            }
        },
        // store
        async storePost (formData) {
            const response = await fetch ('/api/posts', {
                method : 'post',
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`,
                },
                body : JSON.stringify(formData),
            })
            const data = await response.json()
            if (data.errors) {
                this.errors = data.errors
            } else {
                this.errors = {}
                this.router.push({name : 'home'})
            }
        },

        // async updatePost (formData, id) {
        //     const response = await fetch (`/api/posts/${id}`, {
        //         method : 'patch',
        //         headers : {
        //             Authorization : `Bearer ${localStorage.getItem('token')}`,
        //         },
        //         body : JSON.stringify(formData),
        //     })
        //     const data = await response.json()
        //     console.log(data)
        //     if (data.errors) {
        //         // this.errors = data.errors
        //         // console.log(data)
        //     } else {
        //         // this.errors = {}
        //         // this.router.push({name : 'home'})
        //         // console.log(data)
        //     }
        // }
    }
})