<template>
    <input :value="props.modelValue"
    @input="$emit('update:modelValue', ($event.target).value)" :type="props.type" :placeholder="props.placeholder" class="border border-blue-400 py-1 px-3 min-w-[300px] rounded-md shadow-lg font-normal text-base" format=""/>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    modelValue: {
        type: String,
        default: ''
    }
})
</script>