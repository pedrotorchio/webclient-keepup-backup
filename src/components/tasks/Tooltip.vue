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
    setPosition(left, top){
      if (!this.$el.style)
        return;

      const box = this.$parent.$el.getBoundingClientRect();

      left = left || box.width - 10;
      top  = top || box.height - 10;

      this.$el.style.left = `${ left }px`;
      this.$el.style.top = `${ top }px`;
    },
    show() {
      this.shown = true;
    },
    hide() {
      this.shown = false;
      this.$emit('update:editable', false);
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
    },
    change(key, value) {
      const model = { ...this.model };
      model[key] = value;

      this.$emit('change', model);
    }
  },
  computed: {
    startTime() {
      return format(this.model.start);
    },
  },
  updated() {
    this.setPosition();
  }
}
</script>
<template lang="pug">
  div.task-tooltip( 
    v-if = "shown || editable"
    :class = "{ editable }" )
    h1.header {{ startTime }} {{ model.title }}

    editable-input.independency( 
      v-if="model.independency"
      @mouseover = "independencyInfo"
      @mouseout  = "clearInfo"
      icon = "pan_tool"
      :value = "model.independency"
      :editable = "editable"
      @input = "change('independency', $event)"
    ) 

    editable-input.duration( 
      v-if="model.duration"
      @mouseover = "durationInfo"
      @mouseout  = "clearInfo"
      icon = "timer"
      append = "min"
      :value = "model.duration"
      :editable = "editable"
      @input = "change('duration', $event)"
    )

    editable-input.location( 
      v-if="model.location"
      @mouseover = "locationInfo"
      @mouseout  = "clearInfo"
      icon = "location_on"
      :value = "model.location"
      :editable = "editable"
      @input = "change('location', $event)"
    ) 

    editable-input.company( 
      v-if="model.company"
      @mouseover = "companyInfo"
      @mouseout  = "clearInfo"
      icon = "people"
      :value = "model.company"
      :editable = "editable"
      @input = "change('company', $event)"
    )
    
    h3.tooltip-info(
      v-if='info'
      :style="{ backgroundColor: infoColor }") {{ info }}
</template>
<style lang="stylus" scoped>
padding = 5px;

.task-tooltip

  background-color: rgba(0,0,0,.8);
  width: auto;
  max-width: 300px;
  padding: padding;
  color: white;
  font-size: 18px;
  font-weight: 400;
  border-radius: padding;
  z-index 5

  &.editable
    border: 2px solid white;

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
