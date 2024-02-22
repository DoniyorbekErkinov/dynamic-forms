<script setup>
import { ref, onMounted, watch } from "vue";
import { useMainStore } from "./store/index";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const store = useMainStore();
const form = ref({
  username: "",
  lastname: "",
  firstname: "",
  users: "",
  posts: "",
  birthDate: "",
});
const rules = {
  username: {
    required
  },
  lastname: {
    required
  },
  firstname: {
    required
  },
  users: {
    required
  },
  posts: {
    required
  },
  birthDate: {
    required
  },
}
const v$ = useVuelidate(rules, form.value)
function handlePersonSelected(val, item) {
  if (item) {
    for (const i in form.value) {
      if (i === item.id) {
        form.value[i] = val;
        if (item.id === "users") selectedUser.value = form.value[i];
      }
    }
  }
}
const selectedUser = ref(null);
watch(selectedUser, (newVal) => {
  store.getPostByUserId(selectedUser.value);
});

const showResult = ref(false);
function submit() {
  showResult.value = true;
}

onMounted(async () => {
  await store.getUsers();
});

const checking = ref(false)

</script>

<template>
  <div class="flex flex-col p-8 h-screen bg-slate-50">
    <div v-if="showResult"
      class="relative border border-blue-400 bg-slate-50 w-1/3 shadow-md p-4 rounded-xl"
    >
      <ul>
        <li v-for="(item, key, i) of form" :key="i">{{ key }}: {{ item }}</li>
      </ul>
      <div @click="() => showResult = false" class="cursor-pointer absolute text-base rounded-full bg-red-600  w-8 h-8 flex justify-center items-center -right-2 -top-2 text-white">
        X
      </div>
    </div>
    <div
      class="w-full flex flex-col gap-6 p-8 border border-blue-300 rounded-md shadow bg-white mt-14 h-[600px]"
    >
      <div v-for="item in store.formList" :key="item.id">
        <div
          v-if="item.compName === 'Select' && item.id === 'users'">
          <DynamicComponent
         @blur="v$[item.id].$touch"
          class="w-[300px]"
          @itemSelected="(val) => handlePersonSelected(val, item)"
          placeholder="Foydalanuvchilar"
          titleKey="username"
          :list="store.users"
          name="Select"
        />
        <div class="text-red-500" v-if="v$[item.id].$error">Name field has an error.</div>
        </div>
        <div
          v-if="item.compName === 'Select' && item.id === 'posts'">
          <DynamicComponent
         @blur="v$[item.id].$touch"
          class="w-[300px]"
          @itemSelected="(val) => handlePersonSelected(val, item)"
          placeholder="Postlar"
          titleKey="title"
          :list="store.posts"
          name="Select"
        />
        <div class="text-red-500" v-if="v$[item.id].$error">Name field has an error.</div>
        </div>
        <div v-if="item.compName === 'Input' || item.compName === 'DatePicker'">
          <DynamicComponent          
           @blur="v$[item.id].$touch"
          v-model="form[item.id]"
          class="!w-[300px]"
          :placeholder="item.placeholder"
          :type="item.compType"
          :name="item.compName"
        />
        <div class="text-red-500" v-if="v$[item.id].$error">Name field has an error.</div>
        </div>
      </div>
      <div>
        <button
          @click="submit"
          class="py-1 px-3 border border-blue-400 rounded-lg shadow-lg bg-white text-slate-900 font-medium"
        >
          Submut
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
