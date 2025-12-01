<template>
<div 
    class="card p-4 mb-5"
    :class="`has-background-${bgColor}-dark`"
>

    <label 
        v-if="label"
        class="label has-text-white mb-2">
        {{ label }}
    </label>

    <div class="field">
        <div class="control">
            <textarea 
                :value="modelValue"
                @input="$emit('update:modelValue',$event.target.value)"
                class="textarea" 
                :placeholder="placeholder"
                ref="textareaRef"
                maxlength="100"
                v-autofocus
                />
                <!-- ref="newNoteRef" -->
        </div>
    </div>

    <div class="field is-grouped is-grouped-right">
        <div class="control">
            <slot name="buttons" />
        </div>
    </div>
</div>
</template>

<script setup>
/* imports */
import { ref } from 'vue'
import { vAutofocus } from '@/directives/vAutofocus'

/* props */
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }, 
    bgColor: { 
        type: String,
        default: 'success'
    },
    placeholder: {
        type: String,
        default: 'Type something ...'
    },
    label: {
        type: String,
    }
})

/* emits */
const emit = defineEmits(['update:modelValue'])

/* focus textarea */
const textareaRef = ref(null)
const focusTextarea = () => {
    // console.log('focusTextarea')
    textareaRef.value.focus()
}

/* Because we're using the script setter pattern, we need to actually expose any methods that  we want to be made available to a component's parent component */

defineExpose({
    focusTextarea
})

/* directives */
// const vAutofocus = {
//     mounted: (el) => {
//         el.focus()
//     }
// }
</script>

 
