<template>
    <div class="login-box">
        <base-dialog :show="!!error" title="Error" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-spinner v-if="isLoading"></base-spinner>
        <div  class="header"><h2>Your summary:</h2></div>
        <base-card mode="dark">
            <p>Worked: {{ workedHours }} hours</p>
            <p>Should work: {{ shouldWorkHours }} hours (today included)</p>
            <p>Should earn: {{ shouldEarnGross + benefitsCost }} PLN (gross, benefits included)</p>
            <p>Benefits cost: {{ -benefitsCost }} PLN</p>
        </base-card>
        <base-card mode="dark">
            <h4>Benefits:</h4>
            <div v-for="benefit in benefits" :key="benefit">
                <p>{{ benefit.details }} cost: {{ benefit.monthlyCost }} PLN</p>
            </div>
        </base-card>
        <base-card mode="dark" v-if="invoiceInfoRecord != null">
            <h4>Generate invoice:</h4>
            <input type="month" v-model="invoiceMonth"/>
            <base-button @click="downloadInvoice()">Generate</base-button>
        </base-card>
    </div>
</template>

<script>
import BaseButton from '../../components/atoms/BaseButton.vue';
export default {
    components: {
        BaseButton
  },
  data() {
    return {
      workedHours: '00:00',
      shouldEarnGross: 0,
      shouldWorkHours: '00:00',
      invoiceInfoRecord: null,
      invoiceMonth: null,
      benefits: [],
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.loadSummary()
  },
  computed: {
    benefitsCost() {
        let cost = 0;

        for(let benefit of this.benefits) {
            cost -= benefit.monthlyCost
        }
        return Math.round(cost * 100)/100
    }
  },
  methods: {
    async downloadInvoice() {
      this.isLoading = true;
      const login = this.$store.getters.getLogin
        
      if(this.invoiceMonth == null) {
        this.error = 'Please choose invoice generation month.'
        this.isLoading = false
        return
      }

      await fetch(
        'http://localhost:8082/user/'+login+'/generateInvoice?year-month=' + this.invoiceMonth,
        {
          method: 'GET',
        }).then( res => res.blob() )
        .then( blob => {
        var file = window.URL.createObjectURL(blob);
        window.open(file);
        }).catch(() => {
            this.isLoading = false;
            this.addError()
        });
      this.isLoading = false;
    },
    async loadSummary() {
        this.isLoading = true;
        const login = this.$store.getters.getLogin
        const now = new Date().toLocaleDateString("fr-CA", { // you can use undefined as first argument
                year: "numeric",
                month: "2-digit",
            })
        const response = await fetch('http://localhost:8082/user/'+login+'/getPaymentSummary?yearMonth=' + now, {
                      method: 'GET',
                  }).catch(() => {
                    this.addError()
                  });
        if(!response.ok) {
          this.addError()
            this.isLoading = false;
            return
        }
        const jsonResponse = await response.json();

        this.workedHours = this.getHoursString(jsonResponse.workedMinutes)
        this.shouldEarnGross = jsonResponse.theoreticalSummaryRecord.shouldEarnGross
        this.shouldWorkHours = this.getHoursString(jsonResponse.theoreticalSummaryRecord.shouldWorkMinutes)
        this.benefits = jsonResponse.theoreticalSummaryRecord.benefits
        this.invoiceInfoRecord = jsonResponse.invoiceInfoRecord

        this.isLoading = false;
    },
    getHoursString(minutes) {
        const minutesOnly = minutes%60
        const minutesString = minutesOnly < 10 ? '0' + minutesOnly : minutesOnly
        return Math.floor(minutes/60) + ':' + minutesString
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
.list {
    display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}
label {
    text-decoration: none;
    color: #e9e9e9;
    margin: 0 30px;
    border-radius: 10px;
    border-style: solid;
    border-color: transparent;
    border-width: 2px;
    transition: 0.4s;
}
label:hover {
    color:#cb8f40;
    border-color: #cb8f40;
    background-color: #242424;
    box-shadow: 0 0 5px #cb8f40, 0 0 25px #cb8f40, 0 0 50px #cb8f40;
    
}
@media (max-width: 300px) {
    .list {
  grid-template-columns: repeat(1, 1fr);
}
}
</style>