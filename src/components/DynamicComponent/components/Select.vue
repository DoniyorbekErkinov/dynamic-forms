<template>
    <div class="min-w-[300px] border border-blue-400 rounded-lg shadow-md">
      <Listbox v-model="selectedItem">
        <div class="relative mt-1">
          <ListboxButton
            class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span class="block truncate">{{ selectedItem[props.titleKey] || props.placeholder }}</span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <svg
                fill="#000000"
                height="20"
                width="20"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 407.437 407.437"
                xml:space="preserve"
              >
                <polygon
                  points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 "
                />
              </svg>
            </span>
          </ListboxButton>
  
          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-[9999] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                v-slot="{ active, selected }"
                v-for="item in props.list"
                :key="item[props.titleKey]"
                :value="item"
                as="template"
              >
                <li
                  :class="[
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                  ]"
                  @click="selectItem(item)"
                >
                  <span
                    :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]"
                    >{{ item[props.titleKey] }}</span
                  >                
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
  </template>
  
  <script setup>
  import { ref, watch} from "vue";
  import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from "@headlessui/vue";
  
  const props = defineProps({
    list: {
      type: Array,
      default: [],
    },
    titleKey: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  });
  const emit = defineEmits(['itemSelected']);
  
  const selectedItem = ref('');
  watch(() => props.list, (newVal) => {
      selectedItem.value = ''
  })
  function selectItem(item) {
    selectedItem.value = item;
    emit('itemSelected', item.id);
  }
  function clearSelectedItem() {
  selectedItem.value = ''; // Clear selectedItem
};
  </script>