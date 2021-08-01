<template>
  <div id="app">
    <Loader :visible="loading" />
    <Nav />
    <router-view />
  </div>
</template>
<script>
import Loader from "@/components/UI/loader";
import Nav from "./components/Nav";
import { mapState } from "vuex";
export default {
  name: "App",

  components: {
    Nav,
    Loader,
  },
  computed: {
    ...mapState("loader", ["loading"]),
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap");
html,
body {
  font-family: "Roboto", sans-serif;
  background: #f7f7f7;
  min-height: 100vh;
}
</style>