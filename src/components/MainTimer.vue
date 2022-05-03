<template>
  <div class="TheTimer">
    <h3>{{ title }}</h3>
    <div v-if="!finished">
      <p>Test</p>
    </div>
    <div v-else>Finished</div>



  </div>
</template>

<script>
export default {
  name: 'MainTimer',
  props: {
    title: String,
    timers: Object,
  },
  data () {
    return {
      finished:false,
    }
  },
  methods: {
    wait_ms(){
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
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