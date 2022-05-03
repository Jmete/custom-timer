<template>
  <table class="section-list">
    <tr class="section-row">
      <th>Section</th>
      <th>Seconds</th>
      <th>Action</th>
    </tr>
    <tr v-for="timer in $store.state.timers" :key="timer.id" class="section-row">
      <td>{{timer.title}}</td>
      <td>{{timer.seconds}}</td>
      <td>
        <button v-on:click="updateStorage(timer.id)">
          Delete
        </button>
      </td>
    </tr>
  </table>
</template>

<script>
import store from '../store';

export default {
  name: 'SectionList',
  methods:{
    updateStorage(tid){
      store.commit('removeElement',tid)
      localStorage.setItem('timers',JSON.stringify(store.state.timers))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .section-list{
    max-width:600px;
    background-color:#fdfdfd;
    margin: 0 auto;
    padding:10px;
  }
  .section-row{
    color:gray;
  }
  .section-row > *{
    min-width:80px;
  }
</style>