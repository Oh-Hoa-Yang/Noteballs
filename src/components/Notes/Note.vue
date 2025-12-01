<template>
    <!-- v-for="note in notes" -->
    <!-- we'll use notes as our placeholder as we loop through this notes -->
    <div 
        class="card mb-4"
    >
        <div class="card-content">
            <div class="content">
                {{ note.content }}
                <div class="has-text-right has-text-grey-light mt-2">
                    <small>{{ characterLength }}</small>
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