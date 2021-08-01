<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>
<script>
import Nav from "./components/Nav";
export default {
  name: "App",

  components: {
    Nav,
  },
};
</script>
<style>
#app {
  background: #f7f7f7;
}
</style>