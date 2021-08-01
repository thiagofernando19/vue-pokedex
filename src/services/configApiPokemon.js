import axios from "axios";

export const httpsBase = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});
