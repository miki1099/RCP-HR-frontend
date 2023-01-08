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
                    <h2>Your information:</h2>
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
        </div>
    </div>
</template>

<script>
export default {
    name: 'Info.vue',
    data() {
        return {
            userInfo: [],
            invoiceInfo: [],
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
            this.isLoading =  false;
        } catch(exception) {
            this.error = exception.message;
        }
    },
    methods:{
        async getUserInfo() {
            this.isLoading = true;
            const userLogin = this.$store.getters.getLogin;

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
            const userLogin = this.$store.getters.getLogin;

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
        addError() {
            this.error = 'Service is unavailable try again later.';
            throw new Error('Service is unavailable try again later.');
        },
        handleError() {
            this.error = null;
        },
    },
}
</script>

<style scoped>
</style>