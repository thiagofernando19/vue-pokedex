<template>
  <div
    class="dialog-detail"
    transition="dialog-top-transition"
    @keydown.esc="closeDetail"
  >
    <div class="dialog-detail-view card" v-if="show" @keydown.esc="closeDetail">
      <div
        v-if="pokemon"
        class="image"
        :style="{ backgroundColor: pokemon.principalTypeColor }"
      >
        <img :src="imageUrl + pokemon.id + '.png'" alt="" />
      </div>
      <div></div>
      <div v-if="pokemon" class="data card-body">
        <h2 class="card-title">{{ pokemon.name }}</h2>
        <div class="property" style="margin-top: 15px">
          <div class="left destaq">Experiência</div>
          <div class="right">{{ pokemon.base_experience }} XP</div>
        </div>

        <div class="property">
          <div class="left destaq">Altura</div>
          <div class="right">{{ pokemon.height / 10 }} m</div>
        </div>
        <div class="property">
          <div class="left destaq">Peso</div>
          <div class="right">{{ pokemon.weight / 10 }} kg</div>
        </div>
        <h3>Tipo</h3>
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
        <h3>Habilidades</h3>
        <div class="abilities">
          <div
            class="ability"
            v-for="(value, index) in pokemon.abilities"
            :key="'value' + index"
          >
            {{ value.ability.name }}
          </div>
          <div class="right inactive">
            {{ pokemon.moves.map((item) => " " + item.move.name).toString() }} .
          </div>
        </div>
      </div>
      <h2 v-else>Pokemon não encontrado</h2>
      <button class="close" @click="closeDetail">Fechar</button>
    </div>
    <i v-else class="fas fa-spinner fa-spin"></i>
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
      let req = new Request(this.pokemonUrl);
      fetch(req)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          data["principalTypeColor"] = this.getTypePokemon(
            data.types[0].type.name
          ).color;

          this.pokemon = data;
          this.show = true;
        })
        .catch((error) => {
          console.log(error);
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
  padding: 80px 0 0;
  position: relative;

  max-width: 500px;
  background-color: #fff;
  border-radius: 2px;
}
.image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -60px;
  width: 120px;
  height: 120px;
  background-color: #ffcb04;
  border-radius: 50%;
  overflow: hidden;
}

h2 {
  text-transform: capitalize;
}

.data {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
}
.property {
  width: 90%;
  max-width: 400px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
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

.types,
.abilities {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 0 0px 0;
  padding: 0px 30px;
  width: 100%;
  max-width: 400px;
}
.type {
  margin: 15px 15px 15px 0px;
  padding: 0px 5px;
  font-weight: bold;
  font-size: 0.8rem;
  letter-spacing: 1px;
  text-transform: capitalize;
}
.type span {
  color: #ffffff !important;
  padding: 10px 14px;
  border-radius: 29px;
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
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: #c73015;
  color: #efefef;
  padding: 10px 20px;
  margin-bottom: 20px;
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
