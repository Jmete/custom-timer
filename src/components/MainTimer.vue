<template>
  <div class="TheTimer">
    <div v-if="!finished">
      <p>{{$store.state.totalsecs}}</p>
    </div>
    <div v-else>Finished</div>
    <div>{{$store.state.timers}}</div>
    <button v-if="showstart" v-on:click="loop_seconds">Start Timer</button>
    <button v-else v-on:click="pause_loop">Pause</button>
    <button v-if="showstart" v-on:click="init_seconds">Reset</button>



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
      // let secs = 0;
      // store.state.timers.forEach(function(timer){
      //   secs = secs + timer.seconds;
      // })
      // this.totalsecs = secs;
    },
    pause_loop(){
      this.pauseloop = true;
      this.showstart = true;
    },
    async loop_seconds(){
      this.showstart = false;
      // Loop over total seconds until 0
      while(store.state.totalsecs > 0){
        // Wait 1ms between decreasing the seconds
        await this.wait_ms(1000);
        // Check for break loop command
        if (this.pauseloop == true){
          this.pauseloop = false;
          break
        }
        store.commit("decreaseTotalSecs");
      }
      // End State
      if (store.state.totalsecs <= 0){
        this.finished = true;
        this.showstart = true;
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