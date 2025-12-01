import { watch } from "vue"

// export function useWatchCharacters() {
//     watch(newNote, (newValue) => {
//         if (newValue.length === 100) {
//             alert('Only 100 characters allowed gosh dammit!')
//         }
//     })
// }

// In order to make thios composable generic, we need to be able to pass in the data property that we want to watch as parameter.
export function useWatchCharacters(valueToWatch, maxChars = 100) {
    watch(valueToWatch, (newValue) => {
        if (newValue.length === maxChars) {
            alert(`Only ${maxChars} characters allowed gosh darnit!`)
        }
    })
}