<script>
import Spinner from './Spinner';
import { getIndependencyLabel } from '@/visualization/tasks/independency';
import { Scales } from '@/visualization/tasks/scales';
import { memberExpression } from 'babel-types';

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
  components: { Spinner },
  data: () => ({
    shown: false,
  }),
  methods: {
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
        )
      div.row
        v-select.hours(
          dark
          v-model = "startHour"
          label = "Horas"
          :items = "hourOptions"
          color = "primary"
        )
        v-select.minutes(
          dark
          v-model = "startMin"
          label = "Minutos"
          :items = "minuteOptions"
          color = "primary"
        )
        spinner(
          label = "Duração em Minutos"

          :min="5"
          :max="999"
          :step="5"
          :integerOnly="true"

          v-model = "task.duration"
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
        )
      div.row
        v-select(
          dark
          v-model = "task.location"
          label = "Local"
          :items = "localOptions"
          color = "primary"
        )    
      div.row
        v-select(
          dark
          v-model = "task.company"
          label = "Companhia"
          :items = "companyOptions"
          color = "primary"
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
        )    
    div.actions
      button.finished-btn.accept(
        @click = 'submit'
        :style = "{backgroundColor: independencyColorScale(7)}"
      ) Salvar
      button.finished-btn.decline(
        @click = 'cancel'
        :style = "{backgroundColor: independencyColorScale(1)}"
      ) Cancelar

</template>
<style lang="stylus" scoped>

distance = 5px
rowCount = 7
height = 480px //"calc(100% - %s)" % (shownTop) 
rowHeight = (height / rowCount)
shownTop = "calc(100% - %s)" % height //80 + 2*distance
hiddenTop = 100%

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

