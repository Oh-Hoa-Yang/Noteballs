import { defineStore } from 'pinia'

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
        notes: [
            {
                id: 'id1',
                content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, obcaecati! Architecto odio non aliquid maxime dolore vitae debitis? Ipsam exercitationem quisquam ducimus maxime eos impedit eaque magnam ut, perferendis alias.'
            },
            {
                id: 'id2',
                content: 'This is a shorter note! Woo!'
            }
        ]
    }
  },
  actions: {
    addNote(newNoteContent) {
    // console.log('addNote', newNotecontent)
    let currentDate = new Date().getTime(),
    id = currentDate.toString() 

    let note = {
        id,
        content:newNoteContent
    }

    this.notes.unshift(note)
    },
    deleteNote(idToDelete) {
      // console.log(idToDelete)
        // this.notes = this.notes.filter(note => { return note.id != idToDelete})

        // TODO: they are the same (ALERT)
        this.notes = this.notes.filter(note => note.id != idToDelete)
    },
    updateNote(id, content) {
      // console.log('id', id)
      // console.log('content', content)

      // let index = this.notes.findIndex(note => { 
      //   return note.id === id
      //  })

      // TODO: they are the same (ALERT)
      let index = this.notes.findIndex(note => note.id === id)
      // console.log('index: ', index)

      this.notes[index].content = content 
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