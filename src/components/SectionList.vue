<template>
  <div class="mt-6">
    <div class="max-w-lg mx-auto section-row grid grid-cols-4 gap-3 border-b-4">
      <div class="col-span-2"  >Section</div>
      <div class="col-span-1"  >Seconds</div>
      <div class="col-span-1"  >Action</div>
    </div>
    <div class="section-lists max-w-lg mx-auto">
      <draggable v-model="theTimers">
        <div 
        v-for="(timer,index) in theTimers" 
        :key="index" 
        class="section-row grid grid-cols-4 gap-3 p-1 cursor-pointer
        hover:bg-gray-100
        ">
          <div class="col-span-2" >{{timer.title}}</div>
          <div class="col-span-1" >{{timer.seconds}}</div>

          <div class="col-span-1" >

            <button
            class="
            ml-4
            rounded-full 
            border-2 
            border-red-300
            text-red-300 
            w-6
            h-6
            hover:text-white
            hover:bg-red-300"
            v-on:click="updateStorage(index)">
              <!-- Delete -->
            x

            </button>
          <svg class="float-right" width="15px" height="15px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.5 4.625C6.12132 4.625 6.625 4.12132 6.625 3.5C6.625 2.87868 6.12132 2.375 5.5 2.375C4.87868 2.375 4.375 2.87868 4.375 3.5C4.375 4.12132 4.87868 4.625 5.5 4.625ZM9.5 4.625C10.1213 4.625 10.625 4.12132 10.625 3.5C10.625 2.87868 10.1213 2.375 9.5 2.375C8.87868 2.375 8.375 2.87868 8.375 3.5C8.375 4.12132 8.87868 4.625 9.5 4.625ZM10.625 7.5C10.625 8.12132 10.1213 8.625 9.5 8.625C8.87868 8.625 8.375 8.12132 8.375 7.5C8.375 6.87868 8.87868 6.375 9.5 6.375C10.1213 6.375 10.625 6.87868 10.625 7.5ZM5.5 8.625C6.12132 8.625 6.625 8.12132 6.625 7.5C6.625 6.87868 6.12132 6.375 5.5 6.375C4.87868 6.375 4.375 6.87868 4.375 7.5C4.375 8.12132 4.87868 8.625 5.5 8.625ZM10.625 11.5C10.625 12.1213 10.1213 12.625 9.5 12.625C8.87868 12.625 8.375 12.1213 8.375 11.5C8.375 10.8787 8.87868 10.375 9.5 10.375C10.1213 10.375 10.625 10.8787 10.625 11.5ZM5.5 12.625C6.12132 12.625 6.625 12.1213 6.625 11.5C6.625 10.8787 6.12132 10.375 5.5 10.375C4.87868 10.375 4.375 10.8787 4.375 11.5C4.375 12.1213 4.87868 12.625 5.5 12.625Z"
              fill="currentColor"
            />
          </svg>
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