// store/index.js
import { createStore } from 'vuex';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../config/firebaseConfig.js';

export default createStore({
  state: {
    users: []
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    removeUser(state, index) {
      state.users.splice(index, 1);
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "user"));
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        commit('setUsers', users);
      } catch (error) {
        console.error("Error al obtener usuarios: ", error);
      }
    }
  },
  modules: {}
});
