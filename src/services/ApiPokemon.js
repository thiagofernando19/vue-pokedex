import { base } from "./configApiPokemon";
export default {
  getNameUrlPokemon(currentUrl) {
    if (!currentUrl) {
      currentUrl = "pokemon/";
    }
    return base.get(currentUrl);
  },

  getDetailPokemon(codNamePokemon) {
    return base.get("pokemon/" + codNamePokemon);
  },
};
