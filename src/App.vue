<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>CUSTOM TIMER</h1>

  <div>
    <button id="downloadButton" v-on:click="downloadJSON">Download Timer Config</button> 
  </div>

  <div>
    <input v-model="timertitle" placeholder="Enter Timer Title">
    <input type="number" min=1 v-model="counttime.seconds" placeholder="Enter seconds here">
    <button v-on:click="addTimer">Add Section</button>  
  </div>

  <SectionList />
  <!-- <div v-for="timer in timers" :key="timer.id">
    <CountdownTimer :title="timer.title" :seconds="timer.seconds" />
    <button @click="removeElement(timer.id)">Delete Timer</button>
  </div> -->

</template>

<script>
import CountdownTimer from './components/CountdownTimer.vue'
import SectionList from './components/SectionList.vue'
import {saveAs} from 'file-saver';
import store from './store';

export default {
  name: 'App',
  beforeCreate(){
    console.log(localStorage.getItem('timers'));
    store.commit('initStore');
  },
  components: {
    CountdownTimer,
    SectionList,
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
      store.commit("addTimer",tobject);
      console.log("Store Timers is:")
      console.log(store.state.timers);
      localStorage.setItem('timers',JSON.stringify(store.state.timers))
      console.log(localStorage.getItem('timers'));
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
