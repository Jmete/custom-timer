<template>
  <div class="TheTimer">
    <h3>{{ title }}</h3>
    <div v-if="!finished">
      <p>{{counttime.seconds}}</p>
      <button v-if="showcountdown" v-on:click="loop_seconds">Start Timer</button>
      <button v-else v-on:click="breaktime">Pause Timer</button>
    </div>
    <div v-else>Finished</div>



  </div>
</template>

<script>
export default {
  name: 'CountdownTimer',
  props: {
    title: String,
    seconds: Number,
  },
  data () {
    return {
      counttime: {
        seconds:this.seconds,
      },
      timeractive: true,
      showcountdown: true,
      finished:false,
    }
  },
  methods: {
    wait_ms(){
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
    async loop_seconds(){
      this.showcountdown = false;
      this.timeractive = true;
      for (let i = this.counttime.seconds;i>0;i--){
        if (this.timeractive == false){
          break;
        }else{
          await this.wait_ms();
          this.counttime.seconds--
          if (i<=1){
            this.finished = true;
          }
        }
      }
    },
    breaktime(){
      this.timeractive = false;
      this.showcountdown = true;
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