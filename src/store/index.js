import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export const useMainStore = defineStore("Main", () => {
  const users = ref([]);
  const posts = ref([]);
  const getUsers = () => {
    axios.get("https://dummyjson.com/users").then((res) => {
        users.value = res.data.users
    });
  };
  const getPostByUserId = (id) => {
    axios.get(`https://dummyjson.com/users/${id}/posts`).then((res) => {
        posts.value = res.data.posts
    });
  };

  const formList = ref([
    {
      id: "username",
      compName: "Input",
      compType: "text", // if only compName is Input else empty string ('')
      placeholder: "User name", // if compName is Input => string ('') else if it is select it is used as title key
      value: "", // if it is input empty string, if it is select it must be array
      valuekey: "username",
    },
    {
      id: "users",
      compName: "Select",
      compType: "", // if only compName is Input else empty string ('')
      placeholder: "name", // if compName is Input => string ('') else if it is select it is used as title key
      value: [], // if it is input empty string, if it is select it must be array
      valuekey: "id",
    },
    {
      id: "posts",
      compName: "Select",
      compType: "", // if only compName is Input else empty string ('')
      placeholder: "name", // if compName is Input => string ('') else if it is select it is used as title key
      value: [], // if it is input empty string, if it is select it must be array
      valuekey: "id",
    },
    {
      id: "birthDate",
      compName: "Input",
      compType: "date", // if only compName is Input else empty string ('')
      placeholder: "Date", // if compName is Input => string ('') else if it is select it is used as title key
      value: "", // if it is input empty string, if it is select it must be array
      valuekey: "",
    },
  ]);
  return { users, posts, getUsers, getPostByUserId, formList };
});
