import { createStore } from 'vuex'

export default createStore({
  state: {
    timers: []
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
  },
  actions: {
  },
  modules: {
  }
})
