<script>
import List from '@/components/generic/list';
import moment from 'moment';

export default {
  extends: List,
  computed: {
    routines() {
      return this.array;
    }
  },
  methods: {
    getDescriptor(routine) {
      const { title, date } = routine;
      
      const dateObj = moment(date);
      
      const dateDescriptor = dateObj.format('dddd, DD/MMM/YY');
      
      return `${title} - ${dateDescriptor}`;
    }
  }
}
</script>

<template lang="pug">
  v-list(
    :style=`{
        height: routines.length * 100 + "px"
      }`
  )
    v-list-tile.padded(
      v-for="(routine, i) in routines"
      :key="i"
      @click.stop="open(routine)"
    )
      v-list-tile-content
        v-list-tile-title(v-text='getDescriptor(routine)')

      v-list-tile-action(
        @click.stop="action(routine.id)"
      )
        v-icon(
          v-text='icon'
        )
</template>
<style lang="stylus" src="@/components/generic/list/style.styl" scoped></style>