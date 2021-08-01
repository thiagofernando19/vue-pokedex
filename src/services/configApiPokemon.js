import axios from "axios";

export const base = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});
