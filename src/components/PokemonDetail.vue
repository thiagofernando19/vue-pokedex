<template>
  <div class="dialog-detail" transition="dialog-top-transition">
    <div v-if="show">
      <div v-if="pokemon">
        <div :style="{ backgroundColor: pokemon.principalTypeColor }">
          <div class="card-title">
            <h1>{{ pokemon.name }}</h1>
          </div>
          <div
            class="dialog-detail-view"
            :style="{ backgroundColor: pokemon.principalTypeColor }"
          >
            <div class="watermark">
              <img src="../assets/pokeball-background.svg" alt="" />
            </div>
            <div class="image">
              <img
                :src="imageUrl + 'other/dream-world/' + pokemon.id + '.svg'"
                alt=""
              />
            </div>

            <div class="card-body">
              <div class="types">
                <div
                  class="type"
                  v-for="(value, index) in pokemon.types"
                  :key="'value' + index"
                >
                  <span
                    :style="{
                      backgroundColor: getTypePokemon(value.type.name).color,
                    }"
                  >
                    {{ getTypePokemon(value.type.name).name }}
                  </span>
                </div>
              </div>
              <h2 :style="{ color: pokemon.principalTypeColor }">Sobre</h2>
              <div class="card-about">
                <div class="property">
                  <div>
                    <div style="text-align: center">
                      <p>Experiência</p>
                    </div>
                    <p>
                      <span style="font-weight: bold"> EXP </span>
                      {{ pokemon.base_experience }}
                    </p>
                  </div>
                </div>

                <div class="property border-center">
                  <div style="text-align: center">
                    <p>Altura</p>
                  </div>
                  <div>
                    <p>
                      <span>
                        <v-icon small color="#000"> mdi-scale-balance </v-icon>
                      </span>
                      {{ pokemon.height / 10 }} m
                    </p>
                  </div>
                </div>
                <div class="property">
                  <div style="text-align: center">
                    <p>Peso</p>
                  </div>
                  <div>
                    <p>
                      <span>
                        <v-icon small color="#000"> mdi-ruler </v-icon>
                      </span>
                      {{ pokemon.weight / 10 }} kg
                    </p>
                  </div>
                </div>
              </div>

              <div class="abilities">
                <h3>Habilidades</h3>
                <div
                  class="ability"
                  v-for="(value, index) in pokemon.abilities"
                  :key="'value' + index"
                >
                  {{ value.ability.name }}
                </div>
                <div class="right inactive">
                  {{
                    pokemon.moves.map((item) => " " + item.move.name).toString()
                  }}
                  .
                </div>
              </div>
              <button class="close" @click="closeDetail">Fechar</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="dialog-detail-view">
        <div style="margin: 20px">
          <h2>Pokemon não encontrado!</h2>
        </div>
        <button class="close" @click="closeDetail">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pokemonUrl", "imageUrl"],
  data: () => {
    return {
      show: false,
      pokemon: {},
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
  methods: {
    fetchData() {
      let req = new Request(this.pokemonUrl.toLowerCase());
      fetch(req)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
          else return "";
        })
        .then((data) => {
          if (data) {
            data["principalTypeColor"] = this.getTypePokemon(
              data.types[0].type.name
            ).color;
          }
          this.pokemon = data;
          this.show = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    closeDetail() {
      this.$emit("closeDetail");
    },
    getTypePokemon(name) {
      return this.OBJ_TYPES_POKEMON[name];
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
i.fa-spinner {
  text-align: center;
}

.dialog-detail {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  padding: 100px 10px 10px;
  width: 100%;
  height: 100vh;
  background: rgba(10, 7, 0, 0.562);
}
.dialog-detail-view {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 10px 0 0;
  position: relative;
  height: 70vh;
  min-width: 350px;
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
}

.watermark {
  position: absolute;
  height: 0;
  opacity: 0.1;
  top: -85px;
  right: -0px;
}
.watermark img {
  max-width: 240px;
  max-height: 240px;
  width: auto;
  height: auto;
}

.card-title {
  display: flex;
  margin-top: 15px;
  margin-left: 15px;
  align-items: flex-start;
  justify-content: flex-start;
  text-transform: capitalize;
  position: relative;
}

.card-title h1 {
  color: #fff;
}

.image {
  display: flex;
  top: 0px;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  overflow: hidden;
}
.image img {
  max-width: 200px;
  max-height: 150px;
  width: auto;
  height: auto;

  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

h2 {
  text-transform: capitalize;
}

.card-body {
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 98%;
  height: 95%;
  margin-top: 100px;
  margin-bottom: 5px;
  padding-top: 25px;
  border-radius: 8px;
}
.card-about {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: baseline;
}
.property {
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px 10px;
}
.border-center {
  border-left: 2px solid #e0e0e0;
  border-right: 2px solid #e0e0e0;
}
.left {
  float: left;
}
.right {
  float: right;
}
h3 {
  width: 90%;
  max-width: 400px;
  border-bottom: 1px solid #ccc;
}

.types {
  margin: 30px 15px 20px 0px;
  padding: 0px 5px;
  font-weight: bold;
  font-size: 0.8rem;
  letter-spacing: 1px;
  text-transform: capitalize;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 11px;
}
.type span {
  color: #ffffff !important;
  padding: 10px 14px;
  border-radius: 29px;
  margin-left: 15px;
}
.abilities {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 10px 0px 20px 50px;
  padding: 0px 30px;
  width: 100%;
  max-width: 400px;
}

.ability {
  color: rgb(10, 119, 10);
  margin: 15px 10px 10px 0;
  border-radius: 20px;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 0.8rem;
  letter-spacing: 1px;
  text-transform: capitalize;
  word-wrap: none;
  word-break: keep-all;
  background-color: #ffffff;
  border: 3px solid;
}

.close {
  border: none;
  border-radius: 5px;
  background-color: #c73015;
  color: #efefef;
  padding: 10px 20px;

  font-size: 1.2rem;
  cursor: pointer;
}
i {
  font-size: 2rem;
  color: #efefef;
}
.destaq {
  font-weight: bold;
}
.inactive {
  display: none;
}
</style>
