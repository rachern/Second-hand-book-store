<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  sockets: {
    connect(){
        console.log('socket connected')
    },
    'accept messages'(data) {
      console.log(data)
      this.$store.dispatch('user/messages', data)
      if(this.$store.getters.nowIndex) {
        if(data.interactiveMessage.unread[JSON.stringify(JSON.parse(this.$store.getters.nowIndex)._id)].length != 0) {
          this.$socket.emit('hasReadInteractiveMessage', {
              user: this.$store.getters.username,
              other: JSON.parse(this.$store.getters.nowIndex)
          })
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  watch: {
    username(name) {
      this.$socket.emit('username', name)
    }
  }
}
</script>

<style lang="scss">
html,body{
  height: 100%;
  min-width: 1300px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.pointer:hover{
  cursor: pointer;
  color: #E2231A;
}
</style>
