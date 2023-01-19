<template>
    <base-dialog :show="!!error" title="Error" @close="handleError">
        {{ error }}
    </base-dialog>
    <h2>Employee list</h2>
    <h3>Click on user to perform actions</h3>
    <base-spinner v-if="isLoading"></base-spinner>
    <base-card class="pointer" mode="dark" v-for="user in userList" :key="user" @click="goToUser(user.username)"><div><p><label >username:</label> {{ user.username }}</p><p><label>First Name: </label>{{ user.firstName }}</p><p><label>Lest Name: </label>{{ user.lastName }}</p></div></base-card>
</template>


<script>
import BaseCard from '../../../components/UI/BaseCard.vue';
export default {
  components: { BaseCard },
  data() {
    return {
      userList: [],
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
        this.isLoading = true;

        const response = await fetch('http://localhost:8082/hr/user/getAllActive', {
            method: 'GET',
        }).catch(() => {
            this.addError();
        });
        if(!response.ok) {
            this.addError();
        }
        this.userList = await response.json();

        this.isLoading = false;
    },
    goToUser(username) {
        this.$router.push({
            path: '/hrHome/user/editHome',
            query: {username: username}
        })
    },
    addError() {
        this.error = 'Service is unavailable try again later.';
        throw new Error('Service is unavailable try again later.');
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
label {
    color: blueviolet;
}
.pointer, .pointer * {
    cursor: pointer;
}
</style>