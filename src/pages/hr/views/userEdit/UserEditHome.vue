<template>
    <h2>Edit user {{ usernameVal }}</h2>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  props: ['username'],
  computed: {
    usernameVal() {
        return this.username
    }
  },
  methods: {
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