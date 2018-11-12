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
    editable: false
  }),
  methods: {
    ...mapActions([
      'updateTask'
    ]),
    setEditable( state ) {
      
      this.editable = state;

      if (state)
        this.$refs.tooltip.show();
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
    @mouseover="hover"
    @mouseout = "hoverOut"

    :class = "{ selected }"
    :style = "{ top: `${top}px`, left: `${moment}px`, width: `${duration}px`, height: `${height}px`, backgroundColor: independency }"
  )
    tooltip(
      ref = "tooltip"
      :editable = "editable"
      :model = "model"
      :color = "independency" 
      @click = "tooltipClick"
      @change = 'tooltipChange'
    )
</template>
<style lang="stylus" scoped>
.task
  position absolute;
  border-radius 5px;
  cursor: pointer;
.selected
  border: 5px solid white;

</style>
