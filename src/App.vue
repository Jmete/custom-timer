<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <h1 class="text-blue-500 text-4xl mb-8 font-black">CUSTOM TIMER</h1>

  <MainTimer />

  <div class="max-w-lg mx-auto grid grid-cols-3 gap-3 h-8 mt-6">
    <input 
    v-model="timertitle" 
    placeholder="Enter Timer Title"
    class="text-center" >
    
    <input 
    type="number" 
    min=1 
    v-model="counttime.seconds" 
    placeholder="Enter seconds here"
    class="text-center" >

    <button 
    v-on:click="addTimer" 
    class="rounded-full bg-blue-400 text-white align-baseline hover:bg-blue-500">Add Section
    </button>  

  </div>

  <SectionList />

  <div class="mt-4">
    <button 
    id="downloadButton" 
    v-on:click="downloadJSON" 
    class="px-4 rounded-full bg-gray-200 text-gray-400 align-baseline hover:bg-gray-400 hover:text-white"
    >
    Download Timer Config
    </button> 
  </div>

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
