<script>
import Spinner from './Spinner';
import { getIndependencyLabel } from '@/visualization/tasks/independency';
import { Scales } from '@/visualization/tasks/scales';

const independencyColor = new Scales().getIndependencyScale();
export default {
  props: {
    taskOptions: {
      type: Array,
      required: true
    }
  },
  components: { Spinner },
  data: () => ({
    shown: false,
    task: {
      title: '',
      startMin: '00',
      startHour: '06',
      duration: 20,
      independency: 4
    }
  }),
  methods: {
    show() {
      this.shown = true
    },
    hide() {
      this.shown = false
    }
  },
  computed: {
    start() {
      return `${this.task.startHour}:${this.task.startMin}`;
    },
    category() {
      if (!this.task.title)
        return "";

      const { category_id } = this.taskOptions.find( opt => opt.title === this.task.title );

      return category_id;
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
      return independencyColor(this.task.independency);
    }
  }
}
</script>
<template lang="pug">
  div.form.secondary(
    :class = `{
      shown
    }`
  )
    button.close-btn(
      @click = "hide"
    ) X
    div.row
      v-select(
        dark
        v-model = "task.title"
        label = "Selecione a atividade"
        :items = "taskOptions"
        item-text = "title"
        item-value = "title"
        color = "primary"
      )
    div.row
      v-select.hours(
        dark
        v-model = "task.startHour"
        label = "Horas"
        :items = "hourOptions"
        color = "primary"
      )
      v-select.minutes(
        dark
        v-model = "task.startMin"
        label = "Minutos"
        :items = "minuteOptions"
        color = "primary"
      )
      spinner(
        label = "Duração"

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
        :label="independencyLabel"
        :min = '1'
        :max = '7'
        :step = '1'
        :color = 'independencyColor'
      )
        

</template>
<style lang="stylus" scoped>
.row
  display flex
  flex-direction row
  margin: 1em auto;
  width: 80%;
  max-width: 600px;
  min-width 340px

.hours, .minutes
  width 5em
  flex 0 0 auto

.form

  display flex
  flex-direction column
  justify-content flex-start
  align-items flex-start


  distance = 5px
  shownTop = 80 + 2*distance
  hiddenTop = 100%
  height = "calc(100% - %s)" % (shownTop) 

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

  &.shown
    top: shownTop;

  .close-btn
    color white
    position absolute 
    right 1em
    top 1em
    font-size 12px

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

