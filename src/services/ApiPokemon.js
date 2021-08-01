import { httpsBase } from "./configApiPokemon";
export default {
  getNameUrlPokemon(currentUrl) {
    if (!currentUrl) {
      currentUrl = "pokemon/";
    }
    return httpsBase.get(currentUrl);
  },

  getDetailPokemon(codNamePokemon) {
    return httpsBase.get("pokemon/" + codNamePokemon);
  },
};
