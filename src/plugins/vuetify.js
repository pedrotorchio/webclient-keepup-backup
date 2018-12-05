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
  VDialog,
  VDatePicker,
  transitions,
  VProgressLinear,
  VAutocomplete,
  VSelect
} from "vuetify";
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VSlider,
    VAutocomplete,
    VForm,
    VList,
    VTextField,
    VBtn,
    VDatePicker,
    VIcon,
    VDialog,
    VTooltip,
    transitions,
    VProgressLinear,
    VSelect
  },
  theme: {
    // Tangerine
    primary: "#f19f4d",
    secondary: "#4484ce",
    grey: '#d9d9d9',
    warning: "#F19F4D",

    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    
  }
});
