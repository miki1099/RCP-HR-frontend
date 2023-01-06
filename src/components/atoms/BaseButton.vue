<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #00fb15;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 10px;
  letter-spacing: 4px;
}
.type2 {
  color: #c40000;
}
button {
  border: none;
  background: none;
}
button:hover {
  background: #c40000;
  box-shadow: 0 0 5px #c40000, 0 0 25px #c40000, 0 0 50px #c40000;
}

.type2:hover {
  background: #00fb15;
  border-radius: 5px;
  box-shadow: 0 0 5px #00fb15, 0 0 25px #00fb15, 0 0 50px #00fb15;
}

@media (max-width: 600px) {
  button {
    letter-spacing: 2px;
    padding: 5px 10px;
  }
}
</style>