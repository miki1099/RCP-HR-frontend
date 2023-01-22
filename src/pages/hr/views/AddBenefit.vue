<template>
    <div class="login-box" v-if="!isBenefitAdded">
        <base-dialog :show="!!error" title="Error" @close="handleError">
            {{ error }}
        </base-dialog>
        <h2>Add benefit</h2>
        <form @submit.prevent="existUsername == null ? submitMethod() : updateUser()">
            <div class="worklog-box">
                <input type="text" name="" required="" v-model="details" class="valid">
                <label>Name/Details</label>
            </div>
            <div class="worklog-box">
                <input type="number" step="0.01" name="" required="" v-model="monthlyCost" class="valid">
                <label>Monthly cost</label>
            </div>
            <base-spinner v-if="isLoading"></base-spinner>
            <button>
                Create
            </button>
        </form>   
    </div>
    <div v-else>
        <h2>Benefit succesfully added!</h2>
        <router-link to="/hrHome">Home</router-link>
    </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      monthlyCost: null,
      isLoading: false,
      isBenefitAdded: false,
      error: null,
    };
  },
  created() {
  },
  methods: {
    async submitMethod() {
      this.isLoading = true;

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      let roleList = []

      const response = await fetch(
        'http://localhost:8082/hr/user/createBenefit',
        {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({
                details: this.details,
                monthlyCost: this.monthlyCost,
                id: 0,
            }),
        }
      ).catch(() => {
            this.addError();
        })

        const vm = this

      if (!response.ok) {
        response.text().then(function (text) {
            console.log(text)
            vm.error = text
        })
            this.isLoading = false
          return;
      }
      this.isBenefitAdded = true;
      this.isLoading = false;
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

.login-box .checkbox input:focus ~ label,
.login-box .checkbox input:checked ~ label {
  color: #ef3dff;
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

.role-label {
    height: 40px;
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