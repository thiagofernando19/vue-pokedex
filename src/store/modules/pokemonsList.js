import apiPokemon from "../../services/ApiPokemon";
export const state = {
  pokemon: [],

  next_url: "",
};
export const mutations = {
  SET_POKEMON(state, payLoad) {
    state.pokemon = payLoad;
  },

  SET_NEXT_URL(state, payLoad) {
    state.next_url = payLoad;
  },
};

export const getters = {
  listPokemons(state) {
    console.log("getter");
    return state.pokemon;
  },
};

export const actions = {
  async getListOfPokemon({ commit }) {
    console.log("actions");
    try {
      const responsePokemon = await apiPokemon.getNameUrlPokemon(
        state.next_url
      );
      const listPokemon = await responsePokemon.data.results;

      const listPokemonDetails = await Promise.all(
        listPokemon.map(async (pokemon) => {
          const response = await apiPokemon.getDetailPokemon(pokemon.name);
          return response.data;
        })
      );

      const unionResults = Object.values(
        [...state.pokemon, ...listPokemonDetails].reduce(
          (result, { id, ...rest }) => {
            result[id] = {
              ...(result[id] || {}),
              id,
              ...rest,
            };
            return result;
          },
          {}
        )
      );

      commit("SET_NEXT_URL", responsePokemon.data.next);
      commit("SET_POKEMON", unionResults);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
