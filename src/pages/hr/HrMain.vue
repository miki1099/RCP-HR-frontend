<template>
    <h2>HR HOME</h2>
    <base-card mode="dark"><router-link class="link" to="/hrHome/addUser">Add employee</router-link></base-card>
    <base-card mode="dark"><router-link class="link" to="/hrHome/users">Employee list</router-link></base-card>
</template>

<style  scoped>
.link {
    text-decoration: none;
    color: aqua;
}
.link:hover {
    color: rgb(187, 0, 255);
}
</style>
