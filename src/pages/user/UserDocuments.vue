<template>
    <div class="login-box" v-if="!isDaysOffAdded">
        <base-dialog :show="!!error" title="Error" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-spinner v-if="isLoading"></base-spinner>
        <div  class="header"><h2>Your documents:</h2></div>
        <div class="list" v-if="documentsList.length != 0">
            <div v-for="obj in documentsList" :key="obj">
                <base-card mode="dark"><label @click="downloadDocument(obj)">{{ obj }}</label></base-card>
            </div>
        </div>
        <div v-else>
            <h4>There aren't any document assigned to you.</h4>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      documentsList: [],
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.loadDocuments()
  },
  methods: {
    async downloadDocument(filename) {
      this.isLoading = true;
      const login = this.$store.getters.getLogin
        // TODO add login to request when fixed
      await fetch(
        'http://localhost:8082/hr/user/downloadFile/' + filename,
        {
          method: 'GET',
        }).then( res => res.blob() )
        .then( blob => {
        var file = window.URL.createObjectURL(blob);
        window.open(file);
        }).catch(() => {
            this.addError()
        });
      this.isLoading = false;
    },
    async loadDocuments() {
        this.isLoading = true;
        const login = this.$store.getters.getLogin
        const response = await fetch('http://localhost:8082/hr/user/getFile/' + login, {
                      method: 'GET',
                  }).catch(() => {
                    this.addError()
                  });
        if(!response.ok) {
          this.addError()
            this.isLoading = false;
            return
        }
        this.documentsList = await response.json();
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