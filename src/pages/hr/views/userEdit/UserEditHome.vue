<template>
    <h2>Actions for user {{ usernameVal }}</h2>
    <div class="buttons">
      <base-button @click="state = 'add-work-info'">add work info</base-button>
      <base-button @click="state = 'add-invoice-info'">add invoice info</base-button>
      <base-button @click="state = 'add-document'">add document</base-button>
      <base-button @click="state = 'add-manager'">connect to manager</base-button>
      <base-button @click="state = 'edit-user'">edit user</base-button>
    </div>
    <br/>
    <div class="buttons">
      <base-button mode="type3" @click="state = 'show-info'">show user info</base-button>
    </div>
    <br/>
    <div class="buttons">
      <base-button mode="type2" @click="state = 'disable-user'">disable user</base-button>
      <base-button mode="type2" @click="state = 'delete-document'">delete document</base-button>
    </div>
    <br/>
    <base-card mode="dark" v-if="state != null">
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
      <div v-if="state == 'edit-user'">
        <add-user :existUsername="usernameVal" />
      </div>
      <div v-if="state == 'show-info'">
        <info :otherUsername="usernameVal" />
      </div>
      <div v-if="state == 'disable-user'">
        <disable-user :username="usernameVal" />
      </div>
      <div v-if="state == 'delete-document'">
        <delete-document :username="usernameVal" />
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
import DeleteDocument from './DeleteDocument.vue';
import Info from '../../../info/Info.vue';
import AddUser from '../AddUser.vue';
export default {
  components: { BaseButton, AddWorkInfo, AddInvoiceInfo, DisableUser, UploadDocument, AddManager, BaseCard, DeleteDocument, AddUser, Info },
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