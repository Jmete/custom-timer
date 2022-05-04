<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <h1>CUSTOM TIMER</h1>

  <MainTimer />

  <div>
    <button id="downloadButton" v-on:click="downloadJSON">Download Timer Config</button> 
  </div>

  <div>
    <input v-model="timertitle" placeholder="Enter Timer Title">
    <input type="number" min=1 v-model="counttime.seconds" placeholder="Enter seconds here">
    <button v-on:click="addTimer">Add Section</button>  
  </div>

  <SectionList />

</template>

<script>
import SectionList from './components/SectionList.vue'
import {saveAs} from 'file-saver';
import store from './store';
import MainTimer from './components/MainTimer.vue';

export default {
  name: 'App',
  beforeCreate(){
    console.log(localStorage.getItem('timers'));
    store.commit('initStore');
  },
  components: {
    SectionList,
    MainTimer,
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
      return "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store.state.timers));
    }
  },
  methods: {
    addTimer(){
      // let tid = store.timers.length + 1;
      if (this.counttime.seconds > 0){
        let tobject = {title:this.timertitle, seconds:Math.round(this.counttime.seconds)};
        store.commit("addTimer",tobject);
        console.log("Store Timers is:");
        console.log(store.state.timers);
        localStorage.setItem('timers',JSON.stringify(store.state.timers));
        store.commit("initSeconds");
        store.commit("updateSection",store.state.timers[0]);
        store.commit("updateSectionIndex",0);
      } else{
        alert("Please enter seconds as an integer greater than 0.")
      }
    },
    downloadJSON(){
      console.log(this.getTimerJSON);
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
