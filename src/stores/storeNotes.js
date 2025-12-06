import { defineStore } from 'pinia'
import { db } from '@/js/firebase'
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy, addDoc } from 'firebase/firestore'
// setDoc

const notesCollectionRef = collection(db, 'notes')
const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
        notes: [
            // {
            //     id: 'id1',
            //     content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, obcaecati! Architecto odio non aliquid maxime dolore vitae debitis? Ipsam exercitationem quisquam ducimus maxime eos impedit eaque magnam ut, perferendis alias.'
            // },
            // {
            //     id: 'id2',
            //     content: 'This is a shorter note! Woo!'
            // }
        ]
    }
  },
  actions: {
    async getNotes() {
    //   const querySnapshot = await getDocs(collection(db, 'notes'))
    //   querySnapshot.forEach((doc) => {
    //     let note = {
    //       id: doc.id,
    //       content: doc.data().content
    //     }
    //     // console.log('note: ', note)
    //     this.notes.push(note)
    //   })

      onSnapshot(notesCollectionQuery, (querySnapshot) => {
        // console.log('querySnapshot: ', querySnapshot)
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content
          }
          // console.log('note: ', note)
          notes.push(note)
          })
          this.notes = notes
      })
    },
    async addNote(newNoteContent) {
    // console.log('addNote', newNotecontent)
    let currentDate = new Date().getTime(),
    date = currentDate.toString() 

    // let note = {
    //     id,
    //     content:newNoteContent
    // }

    // this.notes.unshift(note)
    // await setDoc(doc(notesCollectionRef, id), {
    //   content: newNoteContent,
    //   id
    // })

    await addDoc(notesCollectionRef, {
      content: newNoteContent,
      date
    })

    },
    async deleteNote(idToDelete) {
      // console.log(idToDelete)
        // this.notes = this.notes.filter(note => { return note.id != idToDelete})

        // TODO: they are the same (ALERT)
        // this.notes = this.notes.filter(note => note.id != idToDelete)
        await deleteDoc(doc(notesCollectionRef, idToDelete));

    },
    async updateNote(id, content) {
      // console.log('id', id)
      // console.log('content', content)

      // let index = this.notes.findIndex(note => { 
      //   return note.id === id
      //  })

      // TODO: they are the same (ALERT)
      let index = this.notes.findIndex(note => note.id === id)
      // console.log('index: ', index)

      // this.notes[index].content = content 
      await updateDoc(doc(notesCollectionRef, id), {
        content
      });
    }
  },
  getters: {
    getNoteContent: (state) => {
      // return state.notes[0].content (get rid of this)
      return (id) => {
        // console.log('id (from getter): ',id)
        return state.notes.filter(note => {
          return note.id === id
        })[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0 
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})