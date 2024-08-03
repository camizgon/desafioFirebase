<template>
  <div>
    <form @submit.prevent="addUser">
      <div class="box">
        <label for="name">Nombre</label>
        <input type="text" v-model="name" required />
        <label for="email">Correo Electrónico</label>
        <input type="email" v-model="email" required />
      </div>
      <button type="submit">Agregar Usuario</button>
    </form>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../config/firebaseConfig.js";

export default {
  data() {
    return {
      name: "",
      email: ""
    };
  },
  methods: {
    async addUser() {
      try {
        const db = getFirestore(app);
        await addDoc(collection(db, "user"), {
          name: this.name,
          email: this.email
        });
        this.name = "";
        this.email = "";
        this.$emit('user-added'); // Emitir evento para indicar que se agregó un usuario
      } catch (error) {
        console.error("Error al agregar usuario: ", error);
      }
    }
  }
};
</script>

<style scoped>
form{
width: 500px;
height: 220px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-left: auto;
margin-right: auto;
border: 1px solid #8c8c8c;
border-radius: 10px;
box-shadow: 1px 2px 1px 2px #8c8c8c;

}
/* Estilos para el formulario */
.box {
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  text-align: left;
}

label {
  margin-top: 10px;
  color: #fff;
  font-size: 17px;
}

input {
  width: 300px;
  height: 30px;
  margin-top: 5px;
  border-radius: px;
  background-color: #8c8c8c;
}

button {
  padding: 10px;
  background-color: #515151;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 10px;
}

button:hover {
  background-color: #3c3c3c;
  color: #fff;
}
</style>

  