import { createStore } from 'vuex'

export default createStore({
  state: {
    timers: [],
    totalsecs: 0,
    sectiontitle: "",
    sectionseconds: 0,
    sectionindex:0,
  },
  getters: {
  },
  mutations: {
    addTimer(state,data){
      state.timers.push(data);
    },
    removeElement(state,itemID) {
      let i = state.timers.map(item => item.id).indexOf(itemID) // find index of your object
      state.timers.splice(i, 1) // remove it from arrays
    },
    initStore(state) {
      if (localStorage.getItem('timers')) {
        state.timers = JSON.parse(localStorage.getItem('timers') || "[]");
      }
    },
    decreaseTotalSecs(state){
      state.totalsecs--
    },
    decreaseSectionSecs(state){
      state.sectionseconds--
    },
    updateSection(state,data){
      state.sectiontitle = data.title;
      state.sectionseconds = data.seconds;
    },
    updateSectionIndex(state,data){
      state.sectionindex = data;
    },
    initSeconds(state){
      let secs = 0;
      state.timers.forEach(function(timer){
        secs = secs + timer.seconds;
      })
      state.totalsecs = secs;
    }
  },
  actions: {
  },
  modules: {
  }
})
