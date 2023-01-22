<template>
    <base-dialog :show="!!error" title="Error" @close="handleError">
        {{ error }}
    </base-dialog>
    <h2>WORK LOG {{ firstNameVal }} {{ lastNameVal }}</h2>
    <base-spinner v-if="isLoading"></base-spinner>
    <base-card class="pointer" mode="dark" v-for="workLog in workLogList" :key="workLog">
        <div>
            <p><label>From: </label>{{ new Date(workLog.from).toLocaleDateString('en-GB')}} {{ new Date(workLog.from).toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" })}}</p>
            <p><label>To: </label>{{ new Date(workLog.to).toLocaleDateString('en-GB')}} {{ new Date(workLog.to).toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" })}}</p>
            <p><label>Comment:</label> {{ workLog.comment }}</p>
            <p><base-button v-if="!workLog.isApproved" @click="addIdToList(workLog.id)">ACCEPT WORK TIME</base-button></p>
        </div>
    </base-card>
    <div><base-button @click="acceptWorkLog">SAVE</base-button></div>
</template>

<script>
import BaseCard from '../../../components/UI/BaseCard.vue';
import BaseButton from '../../../components/atoms/BaseButton.vue';
export default {
    components: { BaseButton, BaseCard },
    data() {
        return {
            workLogToApprove: [],
            workLogList: [],
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
        this.getWorkLog()
    },
    methods: {
        async getWorkLog() {
            this.isLoading = true;
            const currentDate = new Date();
            const monthEarlier = new Date();
            monthEarlier.setMonth(monthEarlier.getMonth() - 2)
            const response = await fetch('http://localhost:8082/workLog/getWorkLogForUser?username='+ this.username + '&from=' + monthEarlier.toISOString() + '&to=' + currentDate.toISOString(), {
                method: 'GET',

            }).catch(() => {
                this.addError();
            });
            if(!response.ok) {
                this.addError();
            }
            this.workLogList = await response.json();
            this.isLoading = false;
        },
        addIdToList(id) {
            this.workLogToApprove.push(id)
        },
        async acceptWorkLog() {
            this.isLoading = true;
            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch('http://localhost:8082/workLog/approveWorkLog', {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({idList:this.workLogToApprove})

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