<script>
import { format } from '@/visualization/utils/time';

export default {
  props: {
    model: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      required: false
    }
  },
  data: () => ({
    info: null,
    infoColor: 'blue',
    shown: false,
  }),
  methods: {
    show() {
      this.shown = true;
    },
    hide() {
      this.shown = false;
    },
    clearInfo() {
      this.info = null;
      this.infoColor = 'blue';
    },
    independencyInfo() {
      let level = null;

      const independency = this.model.independency;

      switch( independency ) {
        case 1: level = 'Inexistente';
        break;
        case 2: level = 'Baixíssima';
        break;
        case 3: level = 'Insuficiente';
        break;
        case 4: level = 'Baixa';
        break;
        case 5: level = 'Regular';
        break;
        case 6: level = 'Boa';
        break;
        case 7: level = 'Completa';
        break;

        default: level = 'Desconhecido';
        break;
      }

      this.info = `Independência ${level}`;
      this.infoColor = this.color;
    },
    durationInfo() {
      this.info = `Duração: ${this.model.duration}min`;
    },
    locationInfo() {
      this.info = `Localização: ${this.model.location}`;
    },
    companyInfo() {
      this.info = `Companhia: ${this.model.company}`;
    }
  },
  computed: {
    startTime() {
      return format(this.model.start);
    },
  }
}
</script>
<template lang="pug">
  div.task-tooltip( v-if = "shown")
    h1.header {{ startTime }} {{ model.title }}
    h2.independency( 
      v-if="model.independency"
      @mouseover = "independencyInfo"
      @mouseout  = "clearInfo"
    ) 
      v-icon( color="primary") pan_tool
      span {{ model.independency }}
    h2.duration( 
      v-if="model.duration"
      @mouseover = "durationInfo"
      @mouseout  = "clearInfo"
    )
      v-icon( color="primary") timer
      span {{ model.duration }}min
    h2.location( 
      v-if="model.location"
      @mouseover = "locationInfo"
      @mouseout  = "clearInfo"
    ) 
      v-icon( color="primary") location_on
      span {{ model.location }}
    h2.company( 
      v-if="model.company"
      @mouseover = "companyInfo"
      @mouseout  = "clearInfo"
    ) 
      v-icon( color="primary") people
      span {{ model.company }}

    h3.tooltip-info(
      v-if='info'
      :style="{ backgroundColor: infoColor }") {{ info }}
</template>
<style lang="stylus" scoped>
padding = 5px;

.task-tooltip
  position absolute;
  top 2em;
  left 2em;
  background-color: rgba(0,0,0,.8);
  width: auto;
  max-width: 300px;
  padding: padding;
  color: white;
  font-size: 18px;
  font-weight: 400;
  border-radius: padding;
  z-index 5

  .header
    font-weight: bold;
    font-size: 1.1em;
    padding: .5em;
  
  h1, h2, h3
    white-space nowrap

  h2
    margin .5em 0
    
    .v-icon
      margin-right .5em !important;
  
  .tooltip-info
    padding: padding;
    font-size: .8em;


</style>
