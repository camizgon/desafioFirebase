<template>
  <div>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        {{ user.name }} - {{ user.email }}
        <button @click="deleteUser(index)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import app from "../config/firebaseConfig.js";

export default {
  props: ['users'],
  methods: {
    async deleteUser(index) {
      try {
        const db = getFirestore(app);
        const userId = this.users[index].id; 
        await deleteDoc(doc(db, "user", userId));
        this.$emit('delete-user', index); // Emitir evento para eliminar el usuario del estado global
      } catch (error) {
        console.error("Error al eliminar usuario: ", error);
      }
    }
  }
};
</script>

<style>
li{
  background-color: aqua;
  color: #fff;
}
</style>