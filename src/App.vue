<template>
  <div id="app">
    <Loader :visible="loading" />
    <Nav />
    <router-view />
  </div>
</template>
<script>
import Nav from "./components/Nav";
import Loader from "@/components/UI/loader";
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
#app {
  background: #f7f7f7;
}
</style>