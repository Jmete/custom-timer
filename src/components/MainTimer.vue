<template>
  <div class="text-gray-600">
    <div v-if="!finished">
      <!-- <p>{{$store.state.totalsecs}}</p> -->
      <p class="text-lg font-medium" >{{$store.state.sectiontitle}}</p>
      <p class="text-5xl my-4 font-extrabold" >{{$store.state.sectionseconds}}</p>
      <div>
        <button 
        class="mx-4 pt-1 px-4 rounded-full border-2 border-slate-800 hover:bg-gray-200" 
        v-on:click="prev_section">Prev
        </button>

        <button
        class="mx-4 pt-1 px-4 rounded-full border-2 border-slate-800 hover:bg-gray-200" 
        v-on:click="next_section">Next
        </button>
      </div>

    </div>
    <div v-else>Finished</div>
    <div class="inline-block mt-4">
      <button 
      class="mx-2 pt-1 px-4 rounded-full border-2 border-green-300 hover:bg-green-300 hover:text-white" 
      v-if="showstart && !finished" 
      v-on:click="start_loop">Start Timer
      </button>

      <button
      class="mx-2 pt-1 px-4 rounded-full border-2 border-red-300 hover:bg-red-300 hover:text-white"
      v-if="!showstart" 
      v-on:click="pause_loop">Pause
      </button>

      <button 
      class="mx-2 pt-1 px-4 rounded-full border-2 border-slate-800 hover:bg-gray-200" 
      v-if="showstart" 
      v-on:click="init_seconds">Reset
      </button>


    </div>

  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'MainTimer',
  mounted(){
    // On mount, initialize the total seconds
    this.init_seconds();
  },
  data () {
    return {
      finished:false,
      pauseloop: false,
      showstart:true,
      previous:false,
      forward:false,
    }
  },
  computed: {
  },
  methods: {
    wait_ms(ms){
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    init_seconds(){
      this.showstart = true;
      this.finished = false;
      store.commit("initSeconds");
      if (store.state.timers[0]){
        store.commit("updateSection",store.state.timers[0]);
      }
      store.commit("updateSectionIndex",0);
      console.log("Seconds initialized");
    },
    start_loop(){
      this.pauseloop = false;
      this.showstart = false;
      this.next_second(store.state.sectionindex);
    },
    pause_loop(){
      this.pauseloop = true;
      this.showstart = true;
    },
    prev_section(){
      // this.pause_loop();
      this.previous = true;
    },
    next_section(i){
      // this.pause_loop();
      this.forward = true;
    },
    async next_second(index){
      this.finished = false;
      if (this.previous == true && store.state.timers[index-1]){
          store.commit("updateSection",store.state.timers[index-1]);
          store.commit("updateSectionIndex",index-1);
          this.previous = false;
          console.log("Previous pressed");
      }
      if (this.forward == true && store.state.timers[index+1]){
          store.commit("updateSection",store.state.timers[index+1]);
          store.commit("updateSectionIndex",index+1);
          this.forward = false;
          console.log("Next pressed");
      }
      if (store.state.sectionseconds > 0){
        await this.wait_ms(1000);
        if (this.pauseloop == true){
          console.log("Loop Paused");
          return null
        }
        store.commit("decreaseSectionSecs");
        store.commit("decreaseTotalSecs");
        this.next_second(store.state.sectionindex);
      }else{
        if (this.pauseloop == true){
          console.log("Loop Paused");
          return null
        }
        // Update Store Section Info
        if (store.state.timers[index+1]){
          store.commit("updateSection",store.state.timers[index+1]);
          store.commit("updateSectionIndex",index+1);
          this.next_second(store.state.sectionindex);
        }else{
          console.log("Finished");
          this.finished = true;
          this.showstart = true;  
        }
      }
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>