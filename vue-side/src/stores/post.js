import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

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
        // Index - get all post
        async index () {
            try {
                const response = await fetch ('/api/posts', {
                    method : 'get',
                })
                const data = await response.json()
                this.posts.value = data
            } catch (error) {
                console.log(error)
            }
        },
        // Show - get one post
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
        // Store
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
        // Update
        async updatePost (formData, post) {
            const authStore = useAuthStore()
            if (authStore.user.id === post.user_id) {
                const response = await fetch (`/api/posts/${post.id}`, {
                    method : 'put',
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem('token')}`,
                    },
                    body : JSON.stringify(formData),
                })
                const data = await response.json()
                console.log(data)
                if (data.errors) {
                    this.errors = data.errors
                }
                else {
                    this.errors = {}
                    this.router.push({name : 'home'})
                }
            }
            else {
                this.errors.value = {message : 'Unauthorised user'}
                console.log(this.errors.value)
            }
        },
        // Delete
        async deletePost (post) {
            try {
                const authStore = useAuthStore()
                if (authStore.user.id === post.user_id) {
                    const response = await fetch (`/api/posts/${post.id}`, {
                        method : 'delete',
                        headers : {
                            Authorization : `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                    const data = await response.json()
                    if (response.ok && data.success !== undefined) {
                        this.errors = {}
                        this.router.push({name : 'home'})
                    } else {
                        this.errors.value = {message : 'Unable to delete the post', data}
                        console.log(this.errors.value)
                    }
                }
                else {
                    this.errors.value = {message : 'Unauthorised user'}
                    console.log(this.errors.value)
                }
            } catch (error) {
                this.errors.value = {message : 'Unable to delete the post', error}
                console.log(this.errors.value)
            }
        },
    }
})