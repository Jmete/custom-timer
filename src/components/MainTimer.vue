<template>
  <div class="TheTimer">
    <div v-if="!finished">
      <!-- <p>{{$store.state.totalsecs}}</p> -->
      <p>{{$store.state.sectiontitle}}</p>
      <p>{{$store.state.sectionseconds}}</p>
    </div>
    <div v-else>Finished</div>
    <!-- <div>{{$store.state.timers}}</div> -->
    <button v-if="showstart" v-on:click="start_loop">Start Timer</button>
    <button v-else v-on:click="pause_loop">Pause</button>
    <button v-if="showstart" v-on:click="init_seconds">Reset</button>
    <!-- <button v-on:click="start_loop">Loop Sections</button> -->
    <br />
    <button v-on:click="prev_section">Prev</button>
    <button v-on:click="next_section">Next</button>



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
      store.commit("updateSection",store.state.timers[0]);
      store.commit("updateSectionIndex",0);
      console.log("Seconds initialized")
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
h3 {
  margin: 40px 0 0;
}

.TheTimer{
  color:grey;
}
</style>