<template>
    <div class="login-box" v-if="!isInvoiceInfoAdded">
        <base-dialog :show="!!error" title="Error" @close="handleError">
            {{ error }}
        </base-dialog>
        <h2>Add invoice info</h2>
        <form @submit.prevent="submitMethod()">
            <div class="worklog-box">
                <input type="text" name="" required="" v-model="accountNumber" class="valid">
                <label>Account number</label>
            </div>
            <div class="worklog-box">
                <input type="text" name="" required="" v-model="companyName" class="valid">
                <label>Company name</label>
            </div>
            <div class="worklog-box">
                <input type="text" pattern="\d*" minlength="10" maxlength="10" name="" required="" v-model="nip" class="valid">
                <label>Nip</label>
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
                <label>Home number</label>
            </div>
            <div class="worklog-box">
                <input type="text" name="" required="" v-model="postalCode" class="valid">
                <label>Postal code</label>
            </div>
            <base-spinner v-if="isLoading"></base-spinner>
            <button>
                Add
            </button>
        </form>   
    </div>
    <div v-else>
        <h2>Work info succesfully added!</h2>
    </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
        accountNumber: '',
        companyName: '',
        nip: '',
        country: '',
        city: '',
        homeNumber: '',
        postalCode: '',
        street: '',
        isLoading: false,
        isInvoiceInfoAdded: false,
        error: null,
    };
  },
  methods: {
    async submitMethod() {
        this.isLoading = true

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const response = await fetch(
            'http://localhost:8082/user/' + this.username + '/addInvoiceInfo',
            {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                accountNumber: this.accountNumber,
                addressDto: {
                    city: this.city,
                    country: this.country,
                    postalCode: this.postalCode,
                    homeNumber: this.homeNumber,
                    street: this.street,

                },
                companyName: this.companyName,
                nip: this.nip
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
        this.isInvoiceInfoAdded = true;
        this.isLoading = false;
    },
    addError() {
        this.error = 'Service is unavailable try again later.';
        throw new Error('Service is unavailable try again later.');
    },
    handleError() {
      this.error = null;
    },
  }
};
</script>

<style scoped>
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