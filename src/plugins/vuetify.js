import Vue from 'vue';
import Vuetify, {
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
  VProgressLinear,
  VAutocomplete,
  VSelect
} from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
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
    VProgressLinear,
    VSelect
  },
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: "#f19f4d",
        secondary: "#4484ce",
        grey: '#d9d9d9',
        warning: "#F19F4D",

        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
      },
    },
  },
});
