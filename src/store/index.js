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
    getSectionTitle: (state) => (index) => {
      return state.timers[index].title
    },
    getSectionSeconds: (state) => (index) => {
      return state.timers[index].seconds
    }
  },
  mutations: {
    addTimer(state,data){
      state.timers.push(data);
    },
    removeElement(state,index) {
      state.timers.splice(index, 1) // remove it from arrays
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
    updateSectionTitle(state,data){
      state.timers[data[1]].title = data[0]
    },
    updateSectionSeconds(state,data){
      state.timers[data[1]].seconds = data[0]
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
      if (state.timers[0]){
        state.sectionseconds = state.timers[0].seconds;
      } else{
        state.sectionseconds = 0;
      }
    },
    updateTimers(state,data){
      state.timers = data;
    },
  },
  actions: {
    updateTimers({commit},data){
      commit("updateTimers",data);
    },
  },
  modules: {
  }
})
