<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <h1 class="text-blue-500 text-4xl mb-8 font-black">CUSTOM TIMER</h1>

  <MainTimer />

  <div class="max-w-lg mx-auto grid grid-cols-3 gap-3 mt-4 py-2 border-t-2 border-b-2">
    <input 
    v-model="timertitle" 
    placeholder="Enter Section Name"
    class="text-center" >
    
    <input 
    type="number" 
    min=1 
    v-model="counttime.seconds" 
    placeholder="Enter seconds here"
    class="text-center" >

    <button 
    v-on:click="addTimer" 
    class="pt-1 rounded-full border-2 border-blue-300 text-gray-500 align-baseline hover:bg-blue-300 hover:text-white">Add Section
    </button>  

  </div>

  <SectionList />

  <div class="mt-4">
    <button 
    id="importJSON"
    v-on:click="uploadJSON"
    class="px-6 pt-1 rounded-full border-2 border-slate-800 text-gray-400 hover:bg-gray-200"
    >
    Import Config
    </button>

    <button 
    id="downloadButton" 
    v-on:click="downloadJSON" 
    class="px-6 pt-1 rounded-full border-2 border-slate-800 text-gray-400 hover:bg-gray-200"
    >
    Download Config
    </button> 

    <br>

    <input type="file" id="selectJSON" class="bg-gray-200 text-gray-500">

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
    uploadJSON(){
      // Based on code from tackoverflow
      const files = document.getElementById('selectJSON').files;
      if (files.length <= 0) {
        console.log("Please upload a file");
        return false;
      }

      const fr = new FileReader();

      fr.onload = e => {
        const result = JSON.parse(e.target.result);
        this.$store.dispatch("updateTimers",result);
        localStorage.setItem('timers',JSON.stringify(store.state.timers));
      }
      fr.readAsText(files.item(0));
    }
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

input[type=file]::file-selector-button {
  border: 2px solid #d8d8d8;
  padding: .2em .4em;
  border-radius: .2em;
  transition: 0.1s;
  background-color: white;
  color:#707070;
}

input[type=file]::file-selector-button:hover {
  background-color: #e0e0e0;
}

</style>
