<template>
  <div>
    <AddUser @user-added="fetchUsers" />
    <UserList :users="users" @delete-user="removeUserFromList" />
  </div>
</template>

<script>
import AddUser from '../components/AddUser.vue';
import UserList from '../components/UserList.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    AddUser,
    UserList
  },
  computed: {
    ...mapState(['users'])
  },
  methods: {
    ...mapActions(['fetchUsers']),
    removeUserFromList(index) {
      this.$store.commit('removeUser', index);
    }
  },
  async mounted() {
    await this.fetchUsers();
  }
}
</script>

<!--Por terminar ya que no me trae por un error los usuarios-->
