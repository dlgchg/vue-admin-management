<template>
  <div class="login-container">
    <input class="top" type="text" v-model="username" placeholder="username"/>
    <input class="top" type="password" v-model="password" placeholder="password"/>
    <button class="top" @click="login">Submit</button>

    <div class="top">
        super user: admin  password: 123456
    </div>
    <div class="top">
        normal user: normal password: 123456
    </div>
    <div class="top">
        editor user: editor password: 123456
    </div>
  </div>
</template>

<script>

import {setToken} from '../utils/token'

export default {
    data() {
        return {
            username: 'admin',
            password: '123456'
        }
    },
    methods: {
        login() {
            setToken(this.username+this.password)
            this.$store.commit('setRoles', this.username)
            this.$router.push({path: '/'})
        }
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.top {
    margin-top: 20px;
}
</style>
