import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'



export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return { 
        user: {}
    }
  },
  actions: {
    init() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log('User logged in: ', user)
                this.user.id = user.uid
                this.user.email = user.email
            } else {
                // console.log('User logged out: ', user)
                this.user = {}
            }
        })
    },
    registerUser(credentials) {
        console.log('registerUser action: ', credentials)
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user
        // console.log('User: ', user)
        }).catch((error) => {
            // console.log('Error message: ', error.message)
        })
    },
    loginUser(credentials) {
        // console.log('User logged in: ', credentials)
        signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
            const user = userCredential.user
            // console.log('User: ', user)
            
        }).catch((error) => {
            // console.log('Error message: ', error.message)
        })
    },
    logoutUser() {
        signOut(auth).then(() => {
            // console.log('User signed out')
        }).catch((error) => {
            // console.log(error.message)
            
        })
    }
  }
})