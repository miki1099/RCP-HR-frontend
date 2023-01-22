<template>
    <div class="main">
        <base-dialog :show="!!error" title="Error" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <div><h2>User Info</h2></div>
        <base-spinner v-if="isLoading"/>
        <div v-if="!isLoading">
            <label>
                <base-card mode="dark">
                    <h2 v-if="otherUsername == null">Your information:</h2>
                        <table>
                            <tr>
                                <th>Username: </th>
                                <th align="left">{{userInfo.username}}</th>
                            </tr>
                            <tr>
                                <th>Name: </th>
                                <th align="left">{{userInfo.firstName}}</th>
                            </tr>
                            <tr>
                                <th>Surname: </th>
                                <th align="left">{{userInfo.lastName}}</th>
                            </tr>
                            <tr>
                                <th>Pesel: </th>
                                <th align="left">{{userInfo.pesel}}</th>
                            </tr>
                            <tr>
                                <th>e-mail: </th>
                                <th align="left">{{userInfo.email}}</th>
                            </tr>
                            <tr>
                                <th>Phone Number: </th>
                                <th align="left">{{userInfo.phone}}</th>
                            </tr>
                            <tr>
                                <th>Birthday: </th>
                                <th align="left">{{ new Date(userInfo.birthDate).toLocaleDateString('en-GB')}}</th>
                            </tr>
                            <tr>
                                <th>Hire day: </th>
                                <th align="left">{{new Date(userInfo.hireDate).toLocaleDateString('en-GB') }}</th>
                            </tr>
                            <tr v-if="otherUsername == null">
                                <th>change password: </th>
                                <th>
                                    <table>
                                        <tr>
                                            <th style="width:5px" >
                                                <input  type="password"
                                                v-model="oldPassword"
                                                name=""
                                                required=""
                                                :class="{ invalid: !isOldValid, valid: isOldValid }"
                                                placeholder="old password"></th>
                                            <th><input type="password"
                                                name=""
                                                v-model="newPassword"
                                                required=""
                                                :class="{ invalid: !isNewValid, valid: isNewValid }"
                                                placeholder="new password"></th>
                                            <th><input type="password"
                                                v-model="confirmPassword"
                                                name=""
                                                :class="{ invalid: !isNewValid, valid: isNewValid }"
                                                required="" placeholder="confirm new password"></th>
                                            <th><base-button @click="changePassword">change</base-button></th>
                                        </tr>
                                    </table>
                                </th>
                            </tr>
                        </table>
                </base-card>
            </label>
            <label>
                <base-card mode="dark">
                    <h2>Address:</h2>
                    <table>
                        <tr>
                            <th>Street: </th>
                            <th align="left">{{userAddress.street}}</th>
                        </tr>
                        <tr>
                            <th>Home Number: </th>
                            <th align="left">{{userAddress.homeNumber}}</th>
                        </tr>
                        <tr>
                            <th>City: </th>
                            <th align="left">{{userAddress.city}}</th>
                        </tr>
                        <tr>
                            <th>Postal Code: </th>
                            <th align="left">{{userAddress.postalCode}}</th>
                        </tr>
                        <tr>
                            <th>Country: </th>
                            <th align="left">{{userAddress.country}}</th>
                        </tr>
                    </table>
                </base-card>
            </label>
            <label v-if="invoiceInfo.length !== 0">
                <base-card mode="dark">
                    <h2>Invoice info:</h2>
                    <table>
                        <tr>
                            <th>Company Name: </th>
                            <th align="left">{{invoiceInfo.companyName}}</th>
                        </tr>
                        <tr>
                            <th>NIP: </th>
                            <th align="left">{{invoiceInfo.nip}}</th>
                        </tr>
                        <tr>
                            <th>Street: </th>
                            <th align="left">{{invoiceAddress.street}}</th>
                        </tr>
                        <tr>
                            <th>Home Number: </th>
                            <th align="left">{{invoiceAddress.homeNumber}}</th>
                        </tr>
                        <tr>
                            <th>City: </th>
                            <th align="left">{{invoiceAddress.city}}</th>
                        </tr>
                        <tr>
                            <th>Postal Code: </th>
                            <th align="left">{{invoiceAddress.postalCode}}</th>
                        </tr>
                        <tr>
                            <th>Country: </th>
                            <th align="left">{{invoiceAddress.country}}</th>
                        </tr>
                        <tr>
                            <th>Account number: </th>
                            <th align="left">{{invoiceInfo.accountNumber}}</th>
                        </tr>
                    </table>
                </base-card>
            </label>
            <label v-if="workInfo.length > 0">
                <h2>Work info:</h2>
                <base-card mode="dark" v-for="work in workInfo" :key="work">
                    <table>
                        <tr>
                            <th>ContractType: </th>
                            <th align="left">{{work.contractType}}</th>
                        </tr>
                        <tr>
                            <th>Daily working time: </th>
                            <th align="left">{{work.dailyWorkingTime}} hours</th>
                        </tr>
                        <tr>
                            <th>Hour rate: </th>
                            <th align="left">{{work.hourlyRate}} PLN</th>
                        </tr>
                        <tr>
                            <th>From: </th>
                            <th align="left">{{new Date(work.from).toLocaleDateString("en-GB")}}</th>
                        </tr>
                        <tr>
                            <th>To: </th>
                            <th align="left">{{new Date(work.to).toLocaleDateString("en-GB")}}</th>
                        </tr>
                    </table>
                </base-card>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Info.vue',
    props: {
        otherUsername: {
            type: String,
            required: false,
            default: null
        },
    },
    data() {
        return {
            isOldValid: true,
            isNewValid: true,
            userInfo: [],
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            invoiceInfo: [],
            workInfo: [],
            userAddress: [],
            invoiceAddress: [],
            isLoading: false,
            error: null,
        };
    },
    created() {
        try {
            this.getUserInfo();
            this.getInvoiceInfo();
            this.getWorkInfo();
            this.isLoading =  false;
        } catch(exception) {
            this.error = exception.message;
        }
    },
    methods:{
        async changePassword() {
            if(this.otherUsername != null) {
                return;
            }
            if(this.userInfo.password !== this.oldPassword){
                this.isOldValid = false
                this.addError('Old password is incorrect.');
                return false
            } else if(this.newPassword.length < 8  || this.newPassword !== this.confirmPassword){
                this.isNewValid = false
                this.addError('New password or confirmation is incorrect.');
                return false
            } else {
                this.isOldValid = true
                this.isNewValid = true
            }
            this.isLoading = true;
            const userLogin = this.$store.getters.getLogin;
            const response = await fetch('http://localhost:8082/user/' + userLogin + '/changePassword', {
                method: 'PATCH',
                body: this.newPassword,
            }).catch(() => {
                this.addError();
            });
            if(!response.ok) {
                this.addError();
            }
            this.isLoading = false;
            window.location.reload();
        },
        async getUserInfo() {
            this.isLoading = true;
            let userLogin = this.otherUsername
            if(this.otherUsername == null) {
                userLogin = this.$store.getters.getLogin;
            }

            const response = await fetch('http://localhost:8082/user/' + userLogin, {
                method: 'GET',
            }).catch(() => {
                this.addError();
            });
            if(!response.ok) {
                this.addError();
            }
            this.userInfo = await response.json();
            this.userAddress = this.userInfo.address;
        },
        async getInvoiceInfo() {
            this.isLoading = true;
            let userLogin = this.otherUsername
            if(this.otherUsername == null) {
                userLogin = this.$store.getters.getLogin;
            }

            const response = await fetch('http://localhost:8082/user/' + userLogin + '/getInvoiceInfo', {
                method: 'GET',
            }).catch(() => {
                this.addError();
            });
            if(!response.ok) {
                if(response.status === 422) {
                    return
                }
                this.addError();
            }
            this.invoiceInfo = await response.json();
            this.invoiceAddress = this.invoiceInfo.addressDto;
        },
        async getWorkInfo() {
            this.isLoading = true;
            let userLogin = this.otherUsername
            if(this.otherUsername == null) {
                userLogin = this.$store.getters.getLogin;
            }

            const response = await fetch('http://localhost:8082/workInfo/getAllForUser/' + userLogin, {
                method: 'GET',
            }).catch(() => {
                this.addError();
            });
            if(!response.ok) {
                if(response.status === 422) {
                    return
                }
                this.addError();
            }
            this.workInfo = await response.json();
            this.isLoading = false;
        },
        addError(msg) {
            this.error = msg;
            throw new Error(msg);
        },
        handleError() {
            this.error = null;
        },
    },
}
</script>

<style scoped>
</style>

<style>
    input:focus,
    input:valid {
    top: -20px;
    left: 35%;
    color: #ef3dff;
    font-size: 15px;
    }
    .valid {
        padding: 10px 0;
        font-size: 16px;
        color: #e9e9e9;
        width: 185px;
        margin-bottom: 20px;
        border: none;
        border-bottom: 1px solid #e9e9e9;
        outline: none;
        background: transparent;
    }
    .invalid {
        color: #e9e9e9;
        padding: 10px;
        font-size: 16px;
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid #ff002b;
        outline: none;
        background: transparent;
    }
</style>