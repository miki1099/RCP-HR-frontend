<template>
    <div class="login-box" v-if="!isUserAdded">
        <base-dialog :show="!!error" title="Error" @close="handleError">
            {{ error }}
        </base-dialog>
        <h2>Add employee</h2>
        <form @submit.prevent="submitMethod()">
            <div class="worklog-box">
                <input type="text" name="" required="" v-model="firstName" class="valid">
                <label>First Name</label>
            </div>
            <div class="worklog-box">
                <input type="text" name="" required="" v-model="lastName" class="valid">
                <label>Last Name</label>
            </div>
            <div class="worklog-box">
                <input type="text" name="" required="" v-model="username" class="valid">
                <label>Username</label>
            </div>
            <div class="worklog-box">
                <input type="email" name="" required="" v-model="email" class="valid">
                <label>Email</label>
            </div>
            <div class="worklog-box">
                <input type="password" name="" required="" v-model="password" class="valid">
                <label>Password</label>
            </div>
            <div class="worklog-box">
                <input type="password" name="" required="" v-model="password2" class="valid">
                <label>Confirm Password</label>
            </div>
            <div class="worklog-box">
                <input type="date" name="" required="" v-model="birthDate" class="valid">
                <label class="date">Birth date</label>
            </div>
            <div class="worklog-box">
                <input type="text" name="" required="" v-model="pesel" class="valid">
                <label>Pesel</label>
            </div>
            <div class="worklog-box">
                <input type="tel" name="" required="" v-model="phone" class="valid">
                <label>Phone number</label>
            </div>
            <div class="worklog-box">
                <input type="text" name="" required="" v-model="country" class="valid">
                <label>Country</label>
            </div>
            <div class="worklog-box">
                <input type="text" name="" required="" v-model="city" class="valid">
                <label>City</label>
            </div>
            <div class="worklog-box">
                <input type="text" name="" required="" v-model="street" class="valid">
                <label>Street</label>
            </div>
            <div class="worklog-box">
                <input type="text" name="" v-model="homeNumber" class="valid">
                <label>Home Number</label>
            </div>
            <div class="worklog-box">
                <input type="text" name="" required="" v-model="postalCode" class="valid">
                <label>Postal Code</label>
            </div>
            <div class="role-label">
                <label>Roles</label>
            </div>
            <div class="checkbox">
                <input type="checkbox" name="" v-model="isManager" class="valid">
                <label>MANAGER</label>
            </div>
            <div class="checkbox">
                <input type="checkbox" name="" v-model="isHr" class="valid">
                <label>HR</label>
            </div>
            <base-spinner v-if="isLoading"></base-spinner>
            <button>
                Create
            </button>
        </form>   
    </div>
    <div v-else>
        <h2>Employee succesfully added!</h2>
        <router-link to="/hrHome">Home</router-link>
    </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      password2: '',
      birthDate: '',
      pesel: '',
      phone: '',
      country: '',
      city: '',
      street: '',
      homeNumber: null,
      postalCode: '',
      isManager: false,
      isHr: false,
      isLoading: false,
      isUserAdded: false,
      error: null,
    };
  },
  created() {
  },
  methods: {
    async submitMethod() {
      this.isLoading = true;
      if(this.password != this.password2) {
        this.error = 'Passwords should match!'
        this.isLoading = false;
        return
      }

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      let roleList = []

      if(this.isHr) {
        roleList.push({
            name: 'HR'
        })
      }
      if(this.isManager) {
        roleList.push({
            name: 'MANAGER'
        })
      }

      const response = await fetch(
        'http://localhost:8082/hr/user/create-user/',
        {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({
                active: true,
                address: {
                    city: this.city,
                    country: this.country,
                    homeNumber: this.homeNumber,
                    postalCode: this.postalCode,
                    street: this.street
                },
                birthDate: this.birthDate,
                email: this.email,
                firstName: this.firstName,
                hireDate: new Date().toISOString(),
                lastName: this.lastName,
                password: this.password,
                pesel: this.pesel,
                phone: this.phone,
                roles: roleList,
                username: this.username
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
      this.isUserAdded = true;
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