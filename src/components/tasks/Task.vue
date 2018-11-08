<script>
import ClickHandler from './ClickHandler';
import Visualization from './Visualization';

export default {
  mixins: [ ClickHandler, Visualization ],
  props: {
    model: {
      type: Object,
      required: true
    },
  },
}
</script>
<template lang="pug">
  article.task(
    @click="select"
    :class = `{ selected }`
    :style = `{
      
    }`
  )
</template>
