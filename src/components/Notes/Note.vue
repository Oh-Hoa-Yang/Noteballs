<template>
    <!-- v-for="note in notes" -->
    <!-- we'll use notes as our placeholder as we loop through this notes -->
    <div 
        class="card mb-4"
    >
        <div class="card-content">
            <div class="content">
                {{ note.content }}
                <div class="columns is-mobile has-text-grey-light mt-2">
                    <small class="column">{{  dateFormatted }}</small>
                    <small class="column has-text-right">{{ characterLength }}</small>
                </div>
            </div>
        </div>
        <footer class="card-footer">
            <RouterLink 
                :to="`/editNote/${note.id}`"
                class="card-footer-item">
                Edit
            </RouterLink>
            <a 
                @click.prevent="modals.deleteNote = true"
                class="card-footer-item"
                href="#"
            >
                Delete
            </a>
        </footer>
        <ModalDeleteNote 
            v-if="modals.deleteNote"
            v-model="modals.deleteNote"
            :noteId="note.id" /> 
    </div>
</template>

<script setup>
/* imports */
import { computed, reactive } from 'vue'
import ModalDeleteNote from './ModalDeleteNote.vue'
import { useStoreNotes } from '@/stores/storeNotes' 
import { RouterLink } from 'vue-router'
import { useDateFormat } from '@vueuse/core'

/* props */
const props = defineProps({
    note: {
        type: Object,
        required: true
    }
})

/* emits */
// const emit = defineEmits(['deleteClicked'])

/* store */
const storeNotes = useStoreNotes()

// Window/Linux: Shift + Alt + A
// Mac: Shift + Option + A
// to make the block section comment 
/* date formatted */
const dateFormatted = computed(() => {
    let date = new Date(parseInt(props.note.date))
    // US Style
    let formattedDate = useDateFormat(date, 'MM-DD-YYYY @ HH:mm:ss')
    // console.log('Formatted: ', formattedDate)
    return formattedDate.value
})

/* character length */
const characterLength = computed(() => {
    let length = props.note.content.length
    let description = length > 1 ? 'characters' : 'character'
    return `${length} ${description}`
})

/* handle delete clicked */
// const handleDeleteClicked = () => {
//     emit('deleteClicked', props.note.id)
// }

/* modals */
const modals = reactive({
    deleteNote: false
})
</script>