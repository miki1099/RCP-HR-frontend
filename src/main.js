import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';
import router from './router.js';

import BaseButton from './components/atoms/BaseButton.vue';
import BaseSpinner from './components/atoms/BaseSpinner.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import BaseCard from "./components/UI/BaseCard.vue";
import BaseCircleCounter from './components/atoms/BaseCircleCounter.vue'

import authModule from './store/auth.js'

const store = createStore({
    modules: {
      auth: authModule,
    },
    state() {
      return {
        isNavOpen: false
      };
    },
    mutations: {
          toggleNav(state) {
            state.isNavOpen = !state.isNavOpen;
          }
    }
});

export default store;

const app = createApp(App)

app.use(store);
app.use(router);

app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('base-card', BaseCard);
app.component('base-circle-counter', BaseCircleCounter);

app.mount('#app');