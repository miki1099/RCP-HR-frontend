<template>
    <h2>Actions for user {{ usernameVal }}</h2>
    <div class="buttons">
      <base-button @click="state = 'add-work-info'">add work info</base-button>
      <base-button @click="state = 'add-invoice-info'">add invoice info</base-button>
      <base-button @click="state = 'add-document'">add document</base-button>
      <base-button @click="state = 'add-manager'">connect to manager</base-button>
    </div>
    <br/>
    <div class="buttons">
      <base-button mode="type2" @click="state = 'disable-user'">disable user</base-button>
    </div>
    <br/>
    <base-card mode="dark">
      <div v-if="state == 'add-work-info'">
        <add-work-info :username="usernameVal"></add-work-info>
      </div>
      <div v-if="state == 'add-invoice-info'">
        <add-invoice-info :username="usernameVal" />
      </div>
      <div v-if="state == 'add-document'">
        <upload-document :username="usernameVal" />
      </div>
      <div v-if="state == 'add-manager'">
        <add-manager :username="usernameVal" />
      </div>
      <div v-if="state == 'disable-user'">
        <disable-user :username="usernameVal" />
      </div>
    </base-card>
</template>

<script>
import BaseButton from '../../../../components/atoms/BaseButton.vue';
import AddInvoiceInfo from './AddInvoiceInfo.vue';
import AddWorkInfo from './AddWorkInfo.vue';
import DisableUser from './DisableUser.vue';
import UploadDocument from './UploadDocument.vue';
import AddManager from './AddManager.vue'
import BaseCard from '../../../../components/UI/BaseCard.vue';
export default {
  components: { BaseButton, AddWorkInfo, AddInvoiceInfo, DisableUser, UploadDocument, AddManager, BaseCard },
  data() {
    return {
      state: null
    };
  },
  props: ['username'],
  computed: {
    usernameVal() {
        return this.username
    }
  }
};
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>