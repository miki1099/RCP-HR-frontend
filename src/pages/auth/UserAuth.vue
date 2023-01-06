<template>
  <div class="login-box">
    <base-dialog :show="!!error" title="Error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <h2>Logowanie</h2>
    <form @submit.prevent="submitMethod()">
      <p v-if="!isFormValid">Login/Email albo hasło są za krótkie!</p>
      <div class="user-box">
        <input
          type="text"
          name=""
          required=""
          v-model="login"
          :class="{ invalid: !isFormValid, valid: isFormValid }"
        />
        <label>Login/Email</label>
      </div>
      <div class="user-box">
        <input
          type="password"
          name=""
          required=""
          v-model="password"
          :class="{ invalid: !isFormValid, valid: isFormValid }"
        />
        <label>Hasło</label>
      </div>
      <base-spinner v-if="isLoading"></base-spinner>
      <button>Zaloguj się</button>
    </form>
  </div>
</template>

<script>
import BaseDialog from '../../components/UI/BaseDialog.vue';
export default {
  created() {
    console.log(localStorage.loginBuf);
    if(localStorage.loginBuf  !== null) {
      this.login = localStorage.loginBuf;
      localStorage.loginBuf = "";
    }
  },
  components: { BaseDialog },
  data() {
    return {
      login: '',
      password: '',
      isFormValid: true,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async submitMethod() {
      this.isLoading = true;
      this.isFormValid = true;
      if (this.login === '' || this.password.length < 4) {
        this.isFormValid = false;
        this.isLoading = false;
        return;
      }

      try {
        await this.$store.dispatch('login', {
          login: this.login,
          password: this.password,
        });
      } catch (err) {
        this.error = err.message;
        this.isLoading = false;
        return;
      }
      this.isLoading = false;
      this.$router.replace('/registerWork');
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>


<style scoped>
p {
  color: rgb(255, 0, 21);
  font-size: 25px;
}

a {
  color: #03e9f4;
  text-decoration: none;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #e9e9e9;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 30%;
}

.login-box .user-box .invalid {
  color: #e9e9e9;
  padding: 10px 0;
  font-size: 16px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #ff002b;
  outline: none;
  background: transparent;
}
.login-box .user-box .valid {
  padding: 10px 0;
  font-size: 16px;
  color: #e9e9e9;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #e9e9e9;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 35%;
  padding: 10px 0;
  font-size: 16px;
  color: #e9e9e9;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 35%;
  color: #ef3dff;
  font-size: 15px;
}

.login-box form button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ef3dff;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 10px;
  letter-spacing: 4px;
}

.sign-up {
  color: #03e9f4;
}
button {
  border: none;
  background: none;
}
.sign-up:hover {
  background: #ef3dff;
  border-radius: 5px;
  box-shadow: 0 0 5px #ef3dff, 0 0 25px #ef3dff, 0 0 50px #ef3dff;
}

.login-box button:hover:not(.sign-up) {
  background: #03e9f4;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4;
}

@media (max-width: 600px) {
  .login-box .user-box input {
    width: 100%;
  }
  .login-box .user-box label {
    left: 0;
  }
  .login-box .user-box input:focus ~ label,
  .login-box .user-box input:valid ~ label {
    left: 0;
  }
  p {
    font-size: 20px;
  }
}
</style>