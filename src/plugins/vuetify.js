import Vue from 'vue'

import {
  Vuetify,
  VApp,
  VForm,
  VList,
  VBtn,
  VIcon,
  VTextField,
  VTooltip,
  VSlider,
  transitions
} from "vuetify";
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VSlider,
    VForm,
    VList,
    VTextField,
    VBtn,
    VIcon,
    VTooltip,
    transitions
  },
  theme: {
    primary: "#ee44aa",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  }
});
