<script>
import Spinner from './Spinner';
import { getIndependencyLabel } from '@/visualization/tasks/independency';
import { Scales } from '@/visualization/tasks/scales';
import { memberExpression } from 'babel-types';
import FormProgressView from '@/components/tasks-form/FormProgressView';

const independencyColor = new Scales().getIndependencyScale();
export default {
  props: {
    taskOptions: {
      type: Array,
      required: true
    },
    task: {
      type: Object,
      required: false
    }
  },
  mixins: [ FormProgressView ],
  components: { Spinner },
  data: () => ({
    shown: false,
  }),
  methods: {
    fieldChanged(fieldName, value){
      if (fieldName == 'startHour' || fieldName == 'startMin') {
        fieldName = 'time';
        value = this.task.time;
      }

      this.$emit('change', { fieldName, value });
    },
    cancel() {
      // reset here

      this.$emit('close');
    },
    submit() {
      // submit here
      if (!(this.task.title && this.task.time && this.task.duration))
        return;
      
      this.$emit('update:task', this.task);
      this.$emit('submit', this.task);
    },
    show() {
      this.shown = true
    },
    hide() {
      this.shown = false
    },
    independencyColorScale(lvl) {
      return independencyColor(lvl);
    },
    getSplitTime() {
      return this.task.time.split(':');
    }
  },
  computed: {
    startMin: {
      set(min) {
        const [hour, m] = this.getSplitTime();
        this.task.time = `${hour}:${min}`
      },
      get() {
        const [hour, min] = this.getSplitTime();
        return min;
      }
    },
    startHour: {
      set(hour) {
        const [h, min] = this.getSplitTime();
        this.task.time = `${hour}:${min}`
      },
      get() {
        const [hour, min] = this.getSplitTime();
        return hour;
      }
    },
    title: {
      set( title ) {
        this.task.title = title;
        this.task.category_id = this.categoryId;
      },
      get() {
        return this.task.title;
      }
    },
    categoryId() {
      if (!this.task.title)
        return "";

      const { category_id } = this.taskOptions.find( opt => opt.title === this.task.title );

      return category_id;
    },
    companyOptions() {
      return [
        'Sozinho',
        'Cuidador',
        'Familiar',
        'Empregado',
        'Amigo',
        'Esposo/Esposa',
        'Pessoas Diversas'
      ]
    },
    localOptions() {
      return [
        'Sala de Estar',
        'Sala de Jantar',
        'Quarto',
        'Banheiro',
        'Cozinha',
        'Externo',
        'Área de Serviço',
        'Área do Condomínio'
      ]
    },
    hourOptions() {
      let hours = [];
      for (let i = 0 ; i < 24 ; i++) {
        const hour = (i+"").padStart(2, 0);
        hours.push(hour);
      }

      return hours;
    },
    minuteOptions() {
      let mins = [];
      for (let i = 0 ; i < 60 ; i += 5) {
        const min = (i+'').padStart(2,0);
        mins.push(min);
      }
      return mins;
    },
    independencyLabel() {
      return getIndependencyLabel(this.task.independency);
    },
    independencyColor() {
      return this.independencyColorScale(this.task.independency);
    }
  }
}
</script>
<template lang="pug">
  main(
    :class = `{
      shown
    }`
  )
    h4#progress-bar.error
      
      span.pts.form-points(
        :class = "{ scoreAnimation: scoreAnimation }"
        :style = "{ left: progress > 10 ? `calc(${progress}% - 60px)` : '0' }"
      ) {{ formPoints }}
      span.pts.max-points.error(
        :style = "{ opacity: (progress > 80) ? 0 : 1 }"
      ) {{ maxPoints }}
    v-progress-linear.progress-bar(
      :value = 'progress'
      color = 'error'
    )
    div.form.secondary
      div.row
        v-select(
          dark
          v-model = "title"
          label = "Selecione a atividade"
          :items = "taskOptions"
          item-text = "title"
          item-value = "title"
          color = "primary"
          @change = "fieldChanged('title', $event)"
        )
      div.row
        v-select.hours(
          dark
          v-model = "startHour"
          label = "Horas"
          :items = "hourOptions"
          color = "primary"
          @change = "fieldChanged('startHour', $event)"
        )
        v-select.minutes(
          dark
          v-model = "startMin"
          label = "Minutos"
          :items = "minuteOptions"
          color = "primary"
          @change = "fieldChanged('startMin', $event)"
        )
        spinner(
          label = "Duração em Minutos"

          :min="5"
          :max="999"
          :step="5"
          :integerOnly="true"

          v-model = "task.duration"
          @change = "fieldChanged('duration', $event)"
        )
      div.row
        v-slider.independency(
          v-model="task.independency"
          hint = "Independência"
          persistent-hint
          always-dirty
          :label="independencyLabel"
          :min = '1'
          :max = '7'
          :step = '1'
          :color = 'independencyColor'
          @change = "fieldChanged('independency', $event)"
        )
      div.row
        v-select(
          dark
          v-model = "task.location"
          label = "Local"
          :items = "localOptions"
          color = "primary"
          @change = "fieldChanged('location', $event)"
        )    
      div.row
        v-select(
          dark
          v-model = "task.company"
          label = "Companhia"
          :items = "companyOptions"
          color = "primary"
          @change = "fieldChanged('company', $event)"
        )    
      div.row
        v-select(
          dark
          v-model = "task.simultaneous_task"
          label = "Atividade Simultânea"
          :items = "taskOptions"
          item-text = "title"
          item-value = "title"
          color = "primary"
          @change = "fieldChanged('simultaneous_task', $event)"
        )    
    div.actions
      button.finished-btn.accept(
        @click = 'submit'
        :style = "{backgroundColor: independencyColorScale(7)}"
      ) Salvar
      button.error.finished-btn.decline(
        @click = 'cancel'
      ) Cancelar

</template>
<style lang="stylus" scoped>

distance = 5px
rowCount = 7
height = 480px //"calc(100% - %s)" % (shownTop) 
rowHeight = (height / rowCount)
shownTop = "calc(100% - %s)" % height //80 + 2*distance
hiddenTop = 100%

.scoreAnimation
  bottom 40px !important
  color black !important
  transform scale(2) !important
  transition-timing-function easeOutQuad

#progress-bar
  display flex
  align-items center
  justify-content flex-end
  padding 5px 0
  position relative
  span
    padding 0 5px
    color white
    flex 0 0 auto
    transition-timing-function easeInQuad
    transition-duration 500ms
    transition-delay 100ms
    bottom 0
  .form-points
    position absolute
    z-index 99
    font-style italic
    transform scale(1)
    transition-property: color, left, bottom, transform;
    
  .max-points 
    z-index 999
    font-weight bold
    transition-property opacity
  
.progress-bar
  margin 0
  align-self flex-end

button
  outline none
.actions
  height rowHeight
  display flex
  align-items stretch
  
  button
    flex 1 1 100%
    color white
    font-weight bold
    letter-spacing 2px
    text-transform uppercase
    &.accept
      
      color #9ad2ff
    &.decline
      
      color #FFBABA
.row
  display flex
  flex-direction row
  margin: .1em auto;
  width: 80%;
  height rowHeight
  max-width: 600px;
  min-width 340px

.hours, .minutes
  width 5em
  flex 0 0 auto

main

  
  position: fixed;
  top hiddenTop
  transition-timing-function: ease-in-out
  transition-delay: 100ms
  transition top 200ms
  // left: distance;
  // right: distance;
  left: 0
  height: height
  width: 100%;
  // width: "calc(100% - %s)" % (2*distance)
  border-top-left-radius: distance;
  border-top-right-radius: distance;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;

  &.shown
    top: shownTop;

.form

  display flex
  flex-direction column
  justify-content space-around
  align-items center

.independency
  margin-right 5px
  height auto
  margin-top 0
  /deep/
    
    label.v-label
      width 5em;
      color white
    .v-messages__message
      color rgba(255,255,255,0.7)





</style>

