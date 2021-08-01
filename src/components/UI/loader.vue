<template>
  <v-row align="center" justify="center" v-if="visible">
    <v-row justify="center">
      <v-overlay :absolute="absolute" :value="visible">
        <v-progress-circular :size="50" color="primary" indeterminate />
        <v-row> carregando... </v-row>
      </v-overlay>
    </v-row>
  </v-row>
</template>
<script>
export default {
  name: "loader",
  props: ["visible"],
  data: () => ({
    absolute: true,
  }),
};
</script>

<style lang="scss">
.loader {
  background: #f7f7f7;
  text-align: center;
  transition: 0.15s ease-in opacity;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
  &--visible {
    opacity: 1;
    pointer-events: all;
  }
}
</style>