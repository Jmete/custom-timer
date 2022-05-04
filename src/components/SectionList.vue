<template>
  <div class="mt-6">
    <div class="max-w-lg mx-auto section-row grid grid-cols-3 gap-3 border-b-4">
      <div>Section</div>
      <div>Seconds</div>
      <div>Action</div>
    </div>
    <div class="section-lists bg-grey max-w-lg mx-auto">
      <draggable v-model="theTimers">
        <div v-for="(timer,index) in theTimers" :key="index" class="section-row grid grid-cols-3 gap-3 p-1 cursor-pointer">
          <div>{{timer.title}}</div>
          <div>{{timer.seconds}}</div>
          <div>
            <button v-on:click="updateStorage(index)">
              Delete
            </button>
          </div>
        </div>
      </draggable>
    </div>
  </div>

</template>

<script>
import store from '../store';
import { VueDraggableNext } from 'vue-draggable-next'

export default {
  name: 'SectionList',
  components:{
    draggable: VueDraggableNext,
  },
  data() {
    return {
      drag: false,
      items:[
        {no:1, name:'キャベツ', categoryNo:'1'},
        {no:2, name:'ステーキ', categoryNo:'2'},
        {no:3, name:'リンゴ', categoryNo:'3'}
      ]
    }
  },
  computed:{
    theTimers: {
      get(){
        return this.$store.state.timers
      },
      set(value){
        this.$store.dispatch("updateTimers",value);
        localStorage.setItem('timers',JSON.stringify(store.state.timers));
        this.$store.commit("initSeconds");
        this.$store.commit("updateSection",store.state.timers[0]);
        this.$store.commit("updateSectionIndex",0);
      }
    },
  },
  methods:{
    updateStorage(tid){
      store.commit('removeElement',tid);
      localStorage.setItem('timers',JSON.stringify(store.state.timers));
      store.commit("initSeconds");
    }
  }
};

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