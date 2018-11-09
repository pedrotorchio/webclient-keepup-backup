<script>
import ClickHandler from './ClickHandler';
import HoverHandler from './HoverHandler';
import Visualization from './Visualization';
import Tooltip from './Tooltip';

export default {
  mixins: [ ClickHandler, HoverHandler, Visualization ],
  props: {
    model: {
      type: Object,
      required: true
    },
  },
  components: { Tooltip }
}
</script>
<template lang="pug">

  article.task(
    @click="select"
    @mouseover="hover"
    @mouseout = "hoverOut"

    :class = "{ selected }"
    :style = "{ top: `${top}px`, left: `${moment}px`, width: `${duration}px`, height: `${height}px`, backgroundColor: independency }"
  )
    tooltip(
      ref="tooltip"
      :model = "model"
      :color = "independency"
      
    )

    

</template>
<style lang="stylus" scoped>
.task
  position absolute;

</style>
