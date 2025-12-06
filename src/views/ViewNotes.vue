<template>
    <div class="notes">

        <AddEditNote 
            v-model="newNote"
            ref="addEditNoteRef"
            placeholder="Add a new note"
        >
            <template #buttons>
                <button 
                    @click="addNote"
                    :disabled="!newNote"
                    class="button is-link has-background-success"
                >
                    Add New Note
                </button>
            </template>
        </AddEditNote> 

        <progress 
                v-if="!storeNotes.notesLoaded" 
                class="progress is-large is-success" 
                max="100" 
        />

        <!-- <pre>
            {{ newNote }}
        </pre> -->

        <!-- <div class="card has-background-success-dark p-4 mb-5">
            <div class="field">
                <div class="control">
                    <textarea 
                        v-model="newNote"
                        class="textarea" 
                        placeholder="Add a new note" 
                        ref="newNoteRef"
                    />
                </div>
            </div>
     
            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button 
                    @click="addNote"
                    :disabled="!newNote"
                    class="button is-link has-background-success">Add New Note</button>
                </div>
            </div>
        </div> -->
        <template v-else>
            <Note 
                v-for="note in storeNotes.notes"
                :key="note.id"
                :note="note"
                />
                <!-- @deleteClicked="deleteNote" -->

                <div 
                    v-if="!storeNotes.notes.length"
                    class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
                >
                    No notes here yet...
                </div>
        </template>


    </div>
</template>

<script setup>
/* imports */
import {ref} from 'vue'
import Note from '@/components/Notes/Note.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes'
import { useWatchCharacters } from '@/use/useWatchCharacters'

/* store */
const storeNotes = useStoreNotes()

/* Notes */
// const newNote = ref('dwdwdwd')
const newNote = ref('')
// const newNoteRef = ref(null)
const addEditNoteRef = ref(null)


const addNote = () => {
    storeNotes.addNote(newNote.value)

    newNote.value = ''
    // newNoteRef.value.focus()
    addEditNoteRef.value.focusTextarea()
}

/* watch characters */
// watch(newNote, (newValue, oldValue) => {
    //this will make the cionsole display the content of each typing, for example:
        // e
        // ew
        // eww
        // ewww
        // ewwwe
    // console.log('newValue', newValue)
    // console.log('oldValue', oldValue)
// })

//Remove the below and make it use to composable which is the use?? function for import, and remove the watcher from the import for now.
// watch(newNote, (newValue) => {
//     if (newValue.length === 100) {
//         alert('Only 100 characters allowed gosh dammit!')
//     }
// })
useWatchCharacters(newNote)



/* delete note */
// const deleteNote = (idToDelete) => {
//     console.log('deleteNote', idToDelete)
//     notes.value = notes.value.filter(note => { return note.id != idToDelete})
// }  
</script>
