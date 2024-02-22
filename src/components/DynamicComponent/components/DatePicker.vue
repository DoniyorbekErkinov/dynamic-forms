<template>
  <VueDatePicker
    :model-value="date"
    @update:model-value="handleDate"
    :enable-time-picker="false"
    :placeholder="props.placeholder"
    @blur="$emit('blur', date)"
  ></VueDatePicker>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  keyItem: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue", "blur"]);
const date = ref();
function handleDate(val) {
  date.value = val;
  const day = String(date.value.getDate()).padStart(2, "0");
  const month = String(date.value.getMonth() + 1).padStart(2, "0"); // January is 0
  const year = date.value.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;
  emit("update:modelValue", formattedDate);
}
watch(
  () => props.keyItem,
  (newVal) => {
    if (props.keyItem === "") {
      date.value = "";
    }
  }
);
</script>
