<template>
    <div class="modal is-active p-2">
        <div class="modal-background"></div>
        <div class="modal-card" ref="modalCardRef">
            <header class="modal-card-head">
            <p class="modal-card-title">Delete Note?</p>
            <button 
                class="delete" 
                aria-label="close"
                @click="closeModal">
            </button>
            </header>
            <section class="modal-card-body">
                Are you sure you want to delete this note?
                <!-- <pre>{{ modelValue }}</pre> -->
                 <!-- <pre>{{ noteId }}</pre> -->
            </section> 
            <footer class="modal-card-foot is-justify-content-flex-end">
            <div class="buttons">
                <button 
                    class="button" 
                    @click="closeModal">
                    Cancel
                </button>
                <button @click="storeNotes.deleteNote(noteId)" class="button is-danger">Delete</button>
            </div>
            </footer>
        </div> 
    </div>
</template>

<script setup>
/* imports */
import { ref, onMounted, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'  
import { useStoreNotes } from '@/stores/storeNotes'
 
/* props */
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: false
    },
    noteId: {
        type: String, 
        required: true
    }
})

/* emits */
const emit = defineEmits(['update:modelValue'])

/* store */
const storeNotes = useStoreNotes()

/* close modal */
const closeModal = () => {
    // console.log('closeModal')
    emit('update:modelValue', false)
}

/* click outside to close */
const modalCardRef = ref(null)
// onClickOutside(target, event => console.log(event))
onClickOutside(modalCardRef, closeModal)

/* keyboard control */
const handleKeyboard = e => {
    // console.log('close it!')
    if (e.key === 'Escape') closeModal()
}

onMounted(() => {
    console.log('onMounted')
    document.addEventListener('keyup', handleKeyboard)
})

onUnmounted(() => {
    console.log('onUnmounted')
    document.removeEventListener('keyup', handleKeyboard)
})

//Since the addEventListener is still working, if we put a console log in it, you will see that it will print 'close it!' once for the ESC pressed first time, repeat the process the second time will show 3, then 6.
//This is because even the modal is closed, the addEventListener is still exists.
// onMounted(() => {
    // console.log('onMounted')
    // document.addEventListener('keyup', e => {
        // console.log(e)
        // console.log('close it!')
        // if (e.key === 'Escape') closeModal()
    // })
// })
</script>