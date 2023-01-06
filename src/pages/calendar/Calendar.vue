<template>
    <div class="main">
      <base-dialog :show="!!error" title="Error" @close="handleError">
          <p>{{ error }}</p>
      </base-dialog>
      <div><h2>Calendar of {{ isPersonalEvents ? 'personal events' : 'company events' }}</h2></div>
      <base-spinner v-if="isLoading"/>
      
      <div  v-if="isPersonalEvents">
        <base-button @click="loadCompanyEvents()">Switch to company events</base-button>
        <br/>
        <br/>
        <table>
        <tr>
            <th>info</th>
            <th>from</th>
            <th>to</th>
            <th>approved status</th>
        </tr>
        <tr v-for="buf in calendarEvents" :key="buf.from" :class="{notApproved: !buf.isApproved}">
            <td>{{ buf.name }}</td>
            <td>{{ getDate(buf.from) }}</td>
            <td>{{ getDate(buf.to) }}</td>
            <td>{{ buf.approved ? 'Approved' : 'Not approved' }}</td>
        </tr>
        </table>
      </div>
      <div v-else>
        <base-button mode="type2" @click="loadPersonalEvents()">Switch to personal events</base-button>
        <br/>
        <br/>
        <table>
        <tr>
            <th>date</th>
            <th>name</th>
        </tr>
        <tr v-for="buf in calendarEvents" :key="buf.name">
            <td>{{ getDate(buf.date) }}</td>
            <td>{{ buf.name }}</td>
        </tr>
        </table>
      </div>
        
    </div>
  </template>
  
  <script>
import BaseButton from '../../components/atoms/BaseButton.vue';
import BaseDialog from '../../components/UI/BaseDialog.vue';
import BaseSpinner from '../../components/atoms/BaseSpinner.vue';
  
  export default {
  components: { BaseButton, BaseDialog, BaseSpinner },
    data() {
      return {
        calendarEvents: [],
        error: null,
        isPersonalEvents: true,
      }
    },
    created() {
      try {
        this.loadPersonalEvents();
      } catch(exception) {
        this.error = ex.message;
      }
    },
    methods: {
      async loadCompanyEvents() {
        this.isLoading = true;
        const response = await fetch('http://localhost:8082/user/calendar/all-company-events', {
                      method: 'GET',
                  }).catch(() => {
                    this.addError()
                  });
        if(!response.ok) {
          this.addError()
        }
        const jsonResponse = await response.json();
        this.calendarEvents = jsonResponse;
        this.isPersonalEvents = false;
        this.isLoading = false;
      },
      async loadPersonalEvents() {
        this.isLoading = true;
        let userlogin = this.$store.getters.getLogin;
        const response = await fetch('http://localhost:8082/user/calendar/events?username=' + userlogin, {
                      method: 'GET',
                  }).catch(() => {
                    this.addError();
                  });
                  if(!response.ok) {
                    this.addError();
              }
        const jsonResponse = await response.json();
        this.calendarEvents = jsonResponse;
        this.isPersonalEvents = true;
        this.isLoading = false;
      },
      getDate(dateArray){
        return dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0]
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
  