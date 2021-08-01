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
html,
body {
  background: #f7f7f7;
  min-height: 100vh;
}
</style>