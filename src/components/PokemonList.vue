<template>
  <v-container fluid grid-list-md>
    <v-layout row dense>
      <v-col
        d-flex
        xs12
        sm6
        md="2"
        v-for="(pokemon, index) in pokemons"
        :key="'pokedex' + index"
      >
        <v-card
          color="#FFFFFF"
          align="center"
          class="rounded-card"
          :hover="true"
          @click="setPokemonUrl(pokemon.url)"
        >
          <img
            :src="imageUrl + pokemon.id + '.png'"
            width="96"
            height="96"
            :alt="'Nome pokemon: ' + pokemon.name"
          />
          <div
            class="title-card"
            :style="{ backgroundColor: pokemon.ObjType.color }"
          >
            {{ pokemon.name }}
          </div>
        </v-card>
      </v-col>

      <div id="scroll-trigger" ref="infinitescrolltrigger"></div>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["imageUrl"],
  data: () => {
    return {
      pokemons: [],
      OBJ_TYPES_POKEMON: {
        normal: {
          name: "Normal",
          color: "#AAA67F",
        },
        fighting: {
          name: "Lutador",
          color: "#583821",
        },
        flying: {
          name: "Voador",
          color: "#7294DA",
        },
        poison: {
          name: "Venenoso",
          color: "#4A0769",
        },
        ground: {
          name: "Terra",
          color: "#D9B964",
        },
        rock: {
          name: "Pedra",
          color: "#B6A87F",
        },
        bug: {
          name: "Inseto",
          color: "#A7B723",
        },
        ghost: {
          name: "Fantasma",
          color: "#70559B",
        },
        steel: {
          name: "Metálico",
          color: "#B7B9D0",
        },
        fire: {
          name: "Fogo",
          color: "#F57D31",
        },
        water: {
          name: "Água",
          color: "#6493EB",
        },
        grass: {
          name: "Planta",
          color: "#74CB48",
        },
        electric: {
          name: "Elétrico",
          color: "#F9CF30",
        },
        psychic: {
          name: "Psíquico",
          color: "#FB5584",
        },
        ice: {
          name: "Gelo",
          color: "#90B0BA",
        },
        dragon: {
          name: "Dragão",
          color: "#57449E",
        },
        dark: {
          name: "Noturno",
          color: "#7C6556",
        },
        fairy: {
          name: "Fada",
          color: "#FEABFB",
        },
        unknown: {
          name: "Desconhecido",
          color: "#70559B70559B",
        },
        shadow: {
          name: "Sombra",
          color: "#70559B",
        },
      },
    };
  },

  beforeMount() {
    this.getListBasicDetail();
  },

  methods: {
    ...mapGetters(["listPokemons"]),
    ...mapActions(["getListOfPokemon"]),

    getListBasicDetail() {
      this.pokemons = this.listPokemons().map((row) => {
        return {
          id: row.id,
          name: row.name,
          url: "https://pokeapi.co/api/v2/pokemon/" + row.id,
          ObjType: this.getTypePokemon(row.types),
        };
      });
    },
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            this.next();
            this.getListBasicDetail();
          }
        });
      });

      observer.observe(this.$refs.infinitescrolltrigger);
    },
    async next() {
      await this.getListOfPokemon();
      this.getListBasicDetail();
    },
    setPokemonUrl(url) {
      this.$emit("setPokemonUrl", url);
    },
    getTypePokemon(arrType) {
      return this.OBJ_TYPES_POKEMON[arrType[0].type.name];
    },
  },

  mounted() {
    this.scrollTrigger();
  },
};
</script>

<style scoped type="text/css">
#scroll-trigger {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  font-size: 2rem;
  color: #efefef;
}

.rounded-card {
  border-radius: 12px !important;
  border-width: 2px;
}

.title-card {
  display: flex;
  height: 60px;
  text-align: center;
  color: #ffffff;
  font-size: 1.1em;

  align-items: center;
  justify-content: center;
  text-transform: capitalize;
}
</style>

