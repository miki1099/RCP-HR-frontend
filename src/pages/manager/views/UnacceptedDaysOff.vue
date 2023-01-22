<template>
    <base-dialog :show="!!error" title="Error" @close="handleError">
        {{ error }}
    </base-dialog>
    <h2>UNACCEPTED DAYS OFF {{ firstNameVal }} {{ lastNameVal }}</h2>
    <base-spinner v-if="isLoading"></base-spinner>
    <base-card class="pointer" mode="dark" v-for="daysOff in daysOffList" :key="daysOff">
        <div>
            <p><label>From: </label>{{ new Date(daysOff.startDate).toLocaleDateString('en-GB')}}</p>
            <p><label>To: </label>{{ new Date(daysOff.endDate).toLocaleDateString('en-GB')}}</p>
            <p><label>Day Off Type:</label> {{ daysOff.type }}</p>
            <p><base-button @click="addToAccept(daysOff.id)">ACCEPT DAYS OFF</base-button></p>
            <p></p>
        </div>
    </base-card>
    <div><base-button @click="acceptDaysOff">SAVE</base-button></div>
</template>

<script>
import BaseCard from '../../../components/UI/BaseCard.vue';
import BaseButton from '../../../components/atoms/BaseButton.vue';
export default {
    components: { BaseButton, BaseCard },
    data() {
        return {
            daysOffList: [],
            daysOffToApprove: [],
            isLoading: false,
            error: null,
        };
    },
    props: ['username', 'firstName', 'lastName'],
    computed: {
        usernameVal () {
            return this.username
        },
        firstNameVal() {
            return this.firstName
        },
        lastNameVal() {
            return this.lastName
        }
    },
    created() {
        this.getUnacceptedDaysOff()
    },
    methods: {
        async getUnacceptedDaysOff(){
            this.isLoading = true;
            const response = await fetch('http://localhost:8082/hr/manager/not-approved-days-off?username='+ this.username, {
                method: 'GET'

            }).catch(() => {
                this.addError();
            });
            if(!response.ok) {
                this.addError();
            }
            this.daysOffList = await response.json();
            this.isLoading = false;
        },
        addToAccept(id) {
            this.daysOffToApprove.push(id)
        },
        async acceptDaysOff() {
            this.isLoading = true;
            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch('http://localhost:8082/hr/manager/approve-days-off', {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({idList:this.daysOffToApprove})

            }).catch(() => {
                this.addError();
            });
            if(!response.ok) {
                this.addError();
            }
            window.location.reload();
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
label {
    color: blueviolet;
}
.pointer, .pointer * {
    cursor: pointer;
}
</style>