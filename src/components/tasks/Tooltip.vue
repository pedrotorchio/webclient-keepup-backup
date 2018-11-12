<script>
import { format } from '@/visualization/utils/time';
import EditableInput from './Input';

export default {
  components: { EditableInput },
  props: {
    model: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      required: false
    },
    editable: {
      type: Boolean,
      defaulte: false
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

    editable-input.independency( 
      v-if="model.independency"
      @mouseover = "independencyInfo"
      @mouseout  = "clearInfo"
      icon = "pan_tool"
      :value = "model.independency"
      :editable = "editable"
      @change = "$emit('change', model)"
    ) 

    editable-input.duration( 
      v-if="model.duration"
      @mouseover = "durationInfo"
      @mouseout  = "clearInfo"
      icon = "timer"
      append = "min"
      :value = "model.duration"
      :editable = "editable"
      @change = "$emit('change', model)"
    )

    editable-input.location( 
      v-if="model.duration"
      @mouseover = "locationInfo"
      @mouseout  = "clearInfo"
      icon = "location_on"
      :value = "model.location"
      :editable = "editable"
      @change = "$emit('change', model)"
    ) 

    editable-input.company( 
      v-if="model.company"
      @mouseover = "companyInfo"
      @mouseout  = "clearInfo"
      icon = "people"
      :value = "model.company"
      :editable = "editable"
      @change = "$emit('change', model)"
    )
    
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
    white-space nowrap
  .input
    margin .5em
  .tooltip-info
    padding: padding;
    font-size: .8em;


</style>
