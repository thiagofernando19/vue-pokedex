<template>
  <v-container>
    <v-col class="div-search">
      <v-row class="title">
        <p>Qual Pokemon você esta procurando?</p>
      </v-row>
      <form @submit.prevent="setPokemonUrl">
        <input
          type="text"
          placeholder="Busque por nome ou código do pokemon"
          v-model="searchvalue"
        />
        <i class="fas fa-search" @click="setPokemonUrl"></i>
      </form>
    </v-col>
  </v-container>
</template>

<script>
export default {
  props: ["apiUrl"],
  data: () => {
    return {
      searchvalue: "",
    };
  },
  methods: {
    setPokemonUrl() {
      if (this.searchvalue !== "")
        this.$emit("setPokemonUrl", this.apiUrl + this.searchvalue);
    },
  },
};
</script>

<style scoped>
.div-search {
  background-color: #fa6555;
  padding: 30px 50px 20px 20px;
  width: 100%;
  border-radius: 10px;
}
.div-search p {
  color: #fff;
  font-size: 1.5rem;
}
.searchbar {
  padding-bottom: 20px;
}
.div-search input {
  border: none;
  outline: none;
  margin: 10px;
  background: #fff;
  border-radius: 15px;
  padding: 10px 40px 10px 10px;
  width: calc(100% - 50px);
  font-size: 1rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}
.title {
  margin: 10px;
}
</style>
