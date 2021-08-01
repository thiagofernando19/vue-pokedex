import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: "#314682",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
        background: {
          base: "#000",
          lighten1: "#36393f",
        },
      },
      light: {
        primary: "#314682",
        background: {
          base: "#000",
          lighten1: "#36393f",
        },
      },
    },
  },
});
