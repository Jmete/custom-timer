<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <input v-model="timertitle" placeholder="Enter Timer Title">
    <input type="number" min=1 v-model="counttime.seconds" placeholder="Enter seconds here">
    <button v-on:click="addTimer">Add Timer</button>  
  </div>

  <div v-for="timer in timers" :key="timer.id">
    <CountdownTimer :title="timer.title" :seconds="timer.seconds" />
  </div>

</template>

<script>
import CountdownTimer from './components/CountdownTimer.vue'

export default {
  name: 'App',
  components: {
    CountdownTimer,
  },
  data () {
    return {
      counttime: {
        seconds:0,
      },
      timertitle:"",
      timers:[],
    }
  },
  methods: {
    addTimer(){
      let tobject = {title:this.timertitle, seconds:this.counttime.seconds};
      this.timers.push(tobject);
      console.log(this.timers);
    },
  },
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
