<template>
    <h2>TEAM VIEW</h2>
    <base-spinner v-if="isLoading"></base-spinner>
    <base-card class="pointer" mode="dark" v-for="subordinate in subordinateList" :key="subordinate">
        <div>
            <p><label >Username:</label> {{ subordinate.username }}</p>
            <p><label>First Name: </label>{{ subordinate.firstName }}</p>
            <p><label>Last Name: </label>{{ subordinate.lastName }}</p>
            <p><base-button @click="worklog(subordinate.username, subordinate.firstName, subordinate.lastName)">Work Log</base-button></p>
            <p><base-button @click="daysOff(subordinate.username, subordinate.firstName, subordinate.lastName)">Unaccepted days off</base-button></p>
        </div>
    </base-card>
</template>


<script>
import BaseCard from '../../components/UI/BaseCard.vue';
import BaseButton from '../../components/atoms/BaseButton.vue';
export default {
    components: { BaseButton, BaseCard },
    data() {
        return {
            subordinateList: [],
            isLoading: false,
            error: null,
        };
    },
    created() {
        console.log(new Date())
        this.getSubordinates()
    },
    methods: {
        async getSubordinates() {
            this.isLoading = true;

            const response = await fetch('http://localhost:8082/hr/manager/team-members?manager='+this.$store.getters.getLogin, {
                method: 'GET',
            }).catch(() => {
                this.addError();
            });
            if(!response.ok) {
                this.addError();
            }
            this.subordinateList = await response.json();

            this.isLoading = false;
        },
        worklog(username, firstName, lastName) {
            this.$router.push({
                path: '/managerHome/showWorkLogs',
                query: {username: username, firstName: firstName, lastName: lastName}
            })
        },
        daysOff(username, firstName, lastName) {
            this.$router.push({
                path: '/managerHome/unacceptedDaysOff',
                query: {username: username, firstName: firstName, lastName: lastName}
            })
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