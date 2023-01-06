<template>
  <div class="main">
    <base-dialog :show="!!error" title="Error" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <div><h2>Log your work</h2></div>
    <base-spinner v-if="isLoading"/>
    <div v-if="!isLoading">
      <base-button v-if="!isStarted" @click="startWork">Start work</base-button>
      <base-button v-if="isStarted" mode="type2" @click="endWork">End work</base-button>
      <base-card mode="dark">
        <h2>Your worklogs for today:</h2>
        <div v-if="workLogs.length !== 0">
          <h3>You worked today: {{ workedTime }}</h3>
          <table>
          <tr>
            <th>from</th>
            <th>to</th>
            <th>duration</th>
            <th>approval status</th>
            <th>comment</th>
          </tr>
          <tr v-for="buf in workLogs" :key="buf.from" :class="{current: buf.to === null, notApproved: !buf.isApproved}">
            <td>{{ new Date(buf.from).toLocaleTimeString('en-GB') }}</td>
            <td>{{ buf.to === null ? "not ended" : new Date(buf.to).toLocaleTimeString('en-GB') }}</td>
            <td>{{ buf.to === null ? "---" : this.getWorkHoursAndMinutes(buf.to - buf.from) }}</td>
            <td>{{ buf.isApproved ? "Approved" : "Not approved" }}</td>
            <td>{{ buf.comment }}</td>
          </tr>
        </table>
        </div>
        <h3 v-else>There aren't any worklogs.</h3>
      </base-card>
    </div>
  </div>
</template>

<script>
import BaseButton from './atoms/BaseButton.vue';
import BaseCard from './UI/BaseCard.vue';

export default {
  components: {
    BaseCard
  },
  data() {
    BaseButton
    return {
      isLoading: false,
      isStarted: false,
      timeStarted: null,
      workLogs: [],
      workedTime: 0,
      error: null,
    }
  },
  created() {
    try {
      this.isAlreadyStarted();
      this.getWorklogs();
    } catch(exception) {
      this.error = ex.message;
    }
  },
  methods: {
    async isAlreadyStarted() {
      this.isLoading = true;
      let userlogin = this.$store.getters.getLogin;
      const response = await fetch('http://localhost:8082/workLog/isStarted?username=' + userlogin, {
                    method: 'GET',
                }).catch(() => {
                  this.addError()
                });
      if(!response.ok) {
        this.addError()
      }
      const jsonResponse = await response.json();
      this.isStarted = jsonResponse;
      this.isLoading = false;
    },
    async startWork() {
      this.isLoading = true;
      let userlogin = this.$store.getters.getLogin;
      const response = await fetch('http://localhost:8082/workLog/startWorkLog?username=' + userlogin, {
                    method: 'PUT',
                }).catch(() => {
                  this.addError();
                });
                if(!response.ok) {
                  this.addError();
            }
      this.getWorklogs()
      this.isStarted = true;
      this.isLoading = false;
    },
    async endWork() {
      this.isLoading = true;
      let userlogin = this.$store.getters.getLogin;
      const response = await fetch('http://localhost:8082/workLog/endWorkLog?username=' + userlogin, {
                    method: 'POST',
                }).catch(() => {
                  this.addError();
                });
                if(!response.ok) {
                  this.addError();
            }
      this.getWorklogs()
      this.isStarted = false;
      this.isLoading = false;
    },
    async getWorklogs() {
      this.isLoading = true;
      const userlogin = this.$store.getters.getLogin;
      let from = this.getDateWithOffset(0);
      let to = this.getDateWithOffset(24);

      const response = await fetch('http://localhost:8082/workLog/getWorkLogForUser?username=' + userlogin + '&from=' + from.toISOString() + '&to=' + to.toISOString(), {
                    method: 'GET',
                }).catch(() => {
                  this.addError();
                });
                if(!response.ok) {
                  this.addError();
            }
      if(!response.ok) {
        this.addError()
      }
      const jsonResponse = await response.json();
      this.workLogs = jsonResponse;
      this.countWorkTime(this.workLogs)
      this.isLoading = false;
    },
    countWorkTime(workLogs) {
      let milisWorked = 0;
        for(const workLog of workLogs) {
          if(workLog.to !== null) {
            milisWorked += workLog.to - workLog.from;
          }
        }
        this.workedTime = this.getWorkHoursAndMinutes(milisWorked)
    },
    getDateWithOffset(hours) {
      let date =new Date();
      date.setHours(hours,0,0,0);
      const offset = date.getTimezoneOffset()
       return new Date(date.getTime() - (offset*60*1000))
    },
    getWorkHoursAndMinutes(milis) {
      const minutes = Math.floor((milis / (1000 * 60)) % 60);
      const hours = Math.floor((milis / (1000 * 60 * 60)) % 24);

      return hours + ':' + (minutes < 10 ? '0' + minutes : minutes)
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
.score-table {
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 50px 0;
  width: 100%;
  overflow: auto;
}
table {
  border-collapse: collapse;
  width: 100%;
}
td,
th {
  padding: 4px;
  /* border: 1px dotted rgb(133, 0, 0); */
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
}
th {
  background-color: #273135;
  font-weight: 400;
}
.current {
    background: #32e500 !important;
}
.notApproved {
  background: #d60000 !important;
}
tr:nth-child(even):not(.current) {
  background: #646b6d;
}
tr:nth-child(odd):not(.current) {
  background: #344146;
}
tr:nth-child(even):hover {
  background: #5a7079;
}

tr:nth-child(odd):hover {
  background: #5f7781;
}
</style>
