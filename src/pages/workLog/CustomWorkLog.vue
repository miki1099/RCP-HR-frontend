<template>
    <div class="login-box" v-if="!isWorkLogAdded">
        <base-dialog :show="!!error" title="Error" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <h2>Add custom worklog</h2>
        <form @submit.prevent="submitMethod()">
            <div class="worklog-box">
                <input type="datetime-local" name="" required="" v-model="from" class="valid">
                <label class="date">Start</label>
            </div>
            <div class="worklog-box">
                <input type="datetime-local" name="" required="" v-model="to" class="valid">
                <label class="date">End</label>
            </div>
            <div class="worklog-box">
                <input type="text" name="" required="" v-model="comment" class="valid">
                <label>Comment</label>
            </div>
            <base-spinner v-if="isLoading"></base-spinner>
            <button>
                Add worklog
            </button>
        </form>   
    </div>
    <div v-else>
        <h2>Work log was succesfully added!</h2>
        <router-link to="/registerWork">Home</router-link>
    </div>
</template>

<script>
export default {
  data() {
    return {
      from: '',
      to: '',
      comment: '',
      isLoading: false,
      isWorkLogAdded: false,
      error: null,
    };
  },
  methods: {
    async submitMethod() {
      this.isLoading = true;
      const login = this.$store.getters.getLogin

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      const response = await fetch(
        'http://localhost:8082/workLog/createWorkLog',
        {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({
            from: this.from,
            to: this.to,
            comment: this.comment,
            username: login
          }),
        }
      );

      if (!response.ok) {
          this.error = 'Service is unavailable, try again later.';
          this.isWorkLogAdded = false;
            this.isLoading = false;
          return;
      }
      this.isWorkLogAdded = true;
      this.isLoading = false;
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
  font-size: 20px;
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

.login-box .worklog-box {
  position: relative;
}

.login-box .worklog-box input {
  width: 30%;
}

.login-box .worklog-box .valid {
  padding: 10px 0;
  font-size: 16px;
  color: #e9e9e9;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #e9e9e9;
  outline: none;
  background: transparent;
}
.date {
    top: -20px !important;
}

.login-box .worklog-box label {
  position: absolute;
  top: 0;
  left: 35%;
  padding: 10px 0;
  font-size: 16px;
  color: #e9e9e9;
  pointer-events: none;
  transition: 0.5s;
}


.login-box .worklog-box input:focus ~ label,
.login-box .worklog-box input:valid ~ label {
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

#submit-worklog {
  color: #03e9f4;
}
button {
  border: none;
  background: none;
}
.login-box button:hover {
  background: #03e9f4;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4;
}

#submit-worklog:hover {
  background: #ef3dff;
  border-radius: 5px;
  box-shadow: 0 0 5px #ef3dff, 0 0 25px #ef3dff, 0 0 50px #ef3dff;
}

@media (max-width: 600px) {
  .login-box .worklog-box input {
    width: 100%;
  }
  .login-box .worklog-box label {
    left: 0;
  }
  .login-box .worklog-box input:focus ~ label,
  .login-box .worklog-box input:valid ~ label {
    left: 0;
  }
}
</style>