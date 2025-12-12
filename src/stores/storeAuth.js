import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useStoreNotes } from './storeNotes'


export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return { 
        user: {}
    }
  },
  actions: {
    init() {
        const storeNotes  = useStoreNotes()

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log('User logged in: ', user)
                this.user.id = user.uid
                this.user.email = user.email
                this.router.push('/')
                storeNotes.init()
            } else {
                // console.log('User logged out: ', user)
                this.user = {}
                this.router.replace('/auth')
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