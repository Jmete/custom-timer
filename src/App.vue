<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>CUSTOM TIMER</h1>

  <div>
    <button id="downloadButton" v-on:click="downloadJSON">Download Timer Config</button> 
  </div>

  <div>
    <input v-model="timertitle" placeholder="Enter Timer Title">
    <input type="number" min=1 v-model="counttime.seconds" placeholder="Enter seconds here">
    <button v-on:click="addTimer">Add Timer</button>  
  </div>

  <div v-for="timer in timers" :key="timer.id">
    <CountdownTimer :title="timer.title" :seconds="timer.seconds" />
    <button @click="removeElement(timer.id)">Delete Timer</button>
  </div>

</template>

<script>
import CountdownTimer from './components/CountdownTimer.vue'
import {saveAs} from 'file-saver';

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
  computed: {
    getTimerJSON() {
      return "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.timers));
    }
  },
  methods: {
    addTimer(){
      let tid = this.timers.length + 1
      let tobject = {id:tid, title:this.timertitle, seconds:this.counttime.seconds};
      this.timers.push(tobject);
      console.log(this.timers);
    },
    removeElement(itemID) {
      let i = this.timers.map(item => item.id).indexOf(itemID) // find index of your object
      this.timers.splice(i, 1) // remove it from arrays
    },
    downloadJSON(){
      console.log(this.getTimerJSON)
      new Promise(resolve => {
        resolve(saveAs(this.getTimerJSON,"timerconfig.json"));
      })
      .then(result => console.log("Done downloading") )
      .catch(err => console.log("Error downloading: " + err));
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

#downloadButton{
  margin:20px;
}
</style>
