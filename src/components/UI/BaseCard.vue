<template>
    <div :class="mode">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      mode: {
        type: String,
        required: false,
        default: 'card',
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    border-radius: 20px;
    box-shadow: 0 2px 8px #434343;
    padding: 1rem;
    margin: 2rem auto;
    max-width: 65%;
    background-color: #3c3c3c;
  }
  
  .dark {
    border-radius: 20px;
    box-shadow: 0 2px 8px #2f2f2f;
    padding: 1rem;
    margin: 2rem auto;
    max-width: 65%;
    background-color: #2f2f2f;
  }
  
  .question {
    border-radius: 20px;
    box-shadow: 0 2px 8px #2f2f2f;
    padding: 1rem;
    margin: 2rem auto;
    max-width: 80%;
    background-color: #2f2f2f;
  }
  
  @media (max-width: 600px) {
    .card,
    .dark {
      max-width: 95%;
    }
  }
  </style>