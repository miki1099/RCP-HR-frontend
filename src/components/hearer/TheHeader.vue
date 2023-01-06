<template>
  <header>
    <the-burger id="side-menu"></the-burger>
    <div id="user-side">
      <div id="welcome-user" v-if="!!userLogin">
        Welcome {{ userLogin }}!
      </div>
      <base-button mode="type2" @click="loginLogout">{{
        !!!userLogin ? 'Log in' : 'Log out'
      }}</base-button>
    </div>
  </header>
</template>

<script>
import TheBurger from '../menu/TheBurger.vue';
export default {
  components: {
    TheBurger,
  },
  computed: {
    userLogin() {
      return this.$store.getters.getName;
    },
  },
  methods: {
    loginLogout() {
      if (this.$store.getters.getLogin === null) {
        this.goToLogin();
      } else {
        this.logout();
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
    logout() {
      this.$store.commit('logout');
      this.$router.replace('/login');
      this.$router.go();
    }
  },
};
</script>


<style scoped>
header {
  width: 90%;
  margin: 0 5%;
}

#side-menu {
  float: left;
  width: 10%;
  height: 3%;
  margin: 15px 50px 0 0;
}

#user-side {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}

#welcome-user {
  font-size: calc(15px + 1vw);
  top: 5%;
  text-align: center;
  display: inline-block;
  margin: 0 5%;
}

.sign-up {
  box-shadow: 0 0 3px #ef3dff;
}

button {
  box-shadow: 0 0 3px #03e9f4;
  border-radius: 5px;
}

@media (max-width: 417px) {
  #side-menu {
    margin: 20px 50px 0 0;
  }
}
</style>