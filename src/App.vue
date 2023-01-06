<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <the-header/>
    <side-bar>
      
    </side-bar>
    <base-card>
      <router-view></router-view>
    </base-card>
  </template>

<script>
import BaseCard from './components/UI/BaseCard.vue'
import SideBar from "./components/menu/SideBar.vue";
import TheHeader from './components/hearer/TheHeader.vue'
export default {
  name: 'App',
  components: {
    BaseCard,
    SideBar,
    TheHeader
  },
  created() {
    this.$store.dispatch('tryLogIn');
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
html {
  background-color: #303133;
  font-size: 20px;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 40px;
  font-family: "Open Sans";
  color: #E9E9E9;
}
div.sidebar-panel-nav {
  display: flex;
  flex-direction: column;
}
div.sidebar-panel-nav > div > a {
  color: #E9E9E9;
  text-decoration: none;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 2em;
  width: 100%;
  align-items: center;
}
div.sidebar-panel-nav > div > a:not(#home) {
  flex-direction: row;
}
div.sidebar-panel-nav > div > a > svg{
  margin-right: 15px;
}
#home svg {
  margin-bottom: 30px;
}
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: rgb(73, 73, 73); 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
@media (max-width: 600px){
        .sidebar-panel-nav {
          display: flex;
        }
        div.sidebar-panel-nav > div > a:not(#home) > svg{
          width: 30px;
          height: 30px;
        }
        html {
          font-size: 15px;
        }
    }
</style>