<script>
import ClickHandler from './ClickHandler';
import HoverHandler from './HoverHandler';
import Visualization from './Visualization';
import Tooltip from './Tooltip';
import FormView from '@/components/generic/form/FormView.mixin';
import { mapActions } from 'vuex';
  
export default {
  
  mixins: [ ClickHandler, HoverHandler, Visualization, FormView ],
  props: {
    model: {
      type: Object,
      required: true
    },
  },
  components: { Tooltip },
  data: () => ({
    editable: false,
    grown: false
  }),
  methods: {
    ...mapActions([
      'updateTask'
    ]),
    setEditable( state ) {
      
      this.editable = state;

      if (state) {
        this.$refs.tooltip.show();
        this.$refs.tooltip.setPosition();
      }
        
      else
        this.$refs.tooltip.hide();
      
    },
    tooltipChange(model) {
      this.submit(model);
    },
    submitProcedure(model) {
      this.$emit('change', model);
      this.updateTask(model);
    }
  }
}
</script>
<template lang="pug">

  article.task(
    @click.self="select"
    @mouseover.self="hover"
    @mousemove.self="move"
    @mouseout = "hoverOut"

    :class = "{ selected, growX: grown }"
    :style = "{ top: `${top}px`, left: `${moment}px`, width: `${duration}px`, height: `${height}px`, backgroundColor: independency }"
  )
    tooltip(
      ref = "tooltip"
      :editable.sync = "editable"
      :model = "model"
      :color = "independency" 
      
      @change = 'tooltipChange'
      @out-click = 'outClick'
    )
</template>
<style lang="stylus" scoped>
padding = 5px;

.task
  position absolute;
  border-radius 5px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
  z-index 9

  &:hover, &.selected
    z-index 99
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

.selected
  border: 5px solid white;
.task-tooltip
  position absolute;
  will-change top, left
  transition-property top, left
  transition-timing-function ease-out
  transition-duration 100ms
  box-shadow: 4px 10px 20px rgba(0,0,0,0.19), 4px 6px 6px rgba(0,0,0,0.23);
  // top 90%; 
  // top: 'calc(100% - %s)' % (2 * padding);
  // left 90%;
  // left: 'calc(100% - %s)' % (2 * padding);

</style>
