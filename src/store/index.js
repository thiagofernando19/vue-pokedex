import Vue from "vue";
import Vuex from "vuex";

import * as pokemonsList from "./modules/pokemonsList";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pokemonsList,
  },
});
