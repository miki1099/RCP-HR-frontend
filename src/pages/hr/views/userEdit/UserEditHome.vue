<template>
    <h2>Actions for user {{ usernameVal }}</h2>
    <div class="buttons">
      <base-button @click="state = 'add-work-info'">add work info</base-button>
      <base-button @click="state = 'add-invoice-info'">add invoice info</base-button>
    </div>
    <div v-if="state == 'add-work-info'">
      <add-work-info :username="usernameVal"></add-work-info>
    </div>
</template>

<script>
import BaseButton from '../../../../components/atoms/BaseButton.vue';
import AddWorkInfo from './AddWorkInfo.vue';
export default {
  components: { BaseButton, AddWorkInfo },
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