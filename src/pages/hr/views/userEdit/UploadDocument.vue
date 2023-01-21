<template>
    <div class="login-box" v-if="!isUploaded">
        <base-dialog :show="!!error" title="Error" @close="handleError">
            {{ error }}
        </base-dialog>
        <h2>Upload document</h2>
        <base-spinner v-if="isLoading"></base-spinner>
        <input type="file" @change="uploadFile" ref="file"/>
        <br/>
        <base-button mode="type3" @click="submitMethod()">upload</base-button>
    </div>
    <div v-else>
        <h2>Document succesfully uploaded!</h2>
    </div>
</template>

<script>
import BaseButton from '../../../../components/atoms/BaseButton.vue';
export default {
  components: { BaseButton },
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
        document: null,
        isLoading: false,
        isUploaded: false,
        error: null,
    };
  },
  methods: {
    uploadFile() {
        this.document = this.$refs.file.files[0];
      },
    async submitMethod() {
        this.isLoading = true


        const formData = new FormData()
        formData.append('file', this.document)
        formData.append('username', this.username)

        const response = await fetch(
            'http://localhost:8082/hr/user/uploadFile',
            {
            method: 'POST',
            body: formData
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
        this.isUploaded = true
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