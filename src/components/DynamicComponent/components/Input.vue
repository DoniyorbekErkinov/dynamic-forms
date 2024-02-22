<template>
  <div
    class="flex items-center border border-blue-400 py-2 px-3 rounded-md shadow-lg font-normal text-base"
  >
    <input
      :id="props.label"
      :value="props.modelValue"
      @input="update"
      :type="props.type"
      :placeholder="props.placeholder"
      format="dd.mm.yyyy"
      class="border-none focus:outline-none w-full"
    />
    <label v-if="props.label" :for="props.label" class="">{{
      props.label
    }}</label>
  </div>
</template>
<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});

function update(val) {
    if (props.type === 'date') {
        let n = val.target.value.split('-').reverse().join('.')       
       emit('update:modelValue', val.target.value)
    } else {
        emit('update:modelValue', val.target.value)
    }
}
</script>
<style scoped lang="scss">
input[type="checkbox"] {
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 6px;
    vertical-align: middle;
    border: 1px solid blue;
    border-radius: 4px;
    background-color: transparent;
  }

  &:checked:before {
    content: url("data:image/svg+xml;utf8,<svg width='22' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' rx='4' fill='%232400FF'/><path d='M15.2798 7.27106C15.4123 7.12888 15.4844 6.94084 15.481 6.74654C15.4776 6.55223 15.3989 6.36685 15.2615 6.22944C15.1241 6.09202 14.9387 6.01331 14.7444 6.00988C14.5501 6.00645 14.362 6.07858 14.2198 6.21106L8.24985 12.1811L5.77985 9.71106C5.63767 9.57858 5.44963 9.50645 5.25532 9.50988C5.06102 9.51331 4.87564 9.59202 4.73822 9.72944C4.60081 9.86685 4.5221 10.0522 4.51867 10.2465C4.51524 10.4408 4.58737 10.6289 4.71985 10.7711L7.71985 13.7711C7.86047 13.9115 8.0511 13.9904 8.24985 13.9904C8.4486 13.9904 8.63922 13.9115 8.77985 13.7711L15.2798 7.27106Z' fill='white'/></svg>");
    display: flex;
    justify-content: center;
    vertical-align: middle;
  }
}
</style>
