import { defineStore } from 'pinia'

export const useAuthStore = defineStore ('authStore', {
    state : () => {
        return {
            user : null,
            errors : {},
        }
    },
    getters : {},
    actions : {
        async getUser () {
            if (localStorage.getItem('token')) {
                const response = await fetch('api/user', {
                    headers : {
                        authorization : `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                const data = await response.json()
                if (response.ok) {
                    this.user = data
                }
                // console.log(data)
            }
        },

        // Login and Registration
        async authenticate (apiRoute, formData) {
            const response = await fetch (`/api/${apiRoute}`, {
                method : 'post',
                body : JSON.stringify(formData)
            })
            const data = await response.json()
            if (data.errors) {
                this.errors = data.errors
            } else {
                localStorage.setItem('token', data.token)
                this.user = data.user
                this.errors = {}
                this.router.push({name : 'home'})
            }
        },
        async logout () {
            try {
                const response = await fetch('/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.ok) {
                    localStorage.removeItem('token')
                    this.user = null
                    this.errors = {}
                    this.router.push({name : 'home'})

                } else {
                    const error = await response.json()
                    console.log(error)
                }
            } catch (err) {
                console.error('Error during logout:', err)
            }
        }
    }
})