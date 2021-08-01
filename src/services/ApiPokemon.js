import { httpsBase } from "./configApiPokemon";
export default {
  getNameUrlPokemon(nextUrl) {
    if (!nextUrl) {
      nextUrl = "pokemon?offset=0&limit=40";
    }
    return httpsBase.get(nextUrl);
  },

  getDetailPokemon(codNamePokemon) {
    return httpsBase.get("pokemon/" + codNamePokemon);
  },
};
