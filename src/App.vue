<template>
  <div id="app">
    <Vehicle/>
  </div>
</template>

<script>
import Vehicle from './components/Vehicles.vue'

export default {
  name: 'App',
  components: {
    Vehicle
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
