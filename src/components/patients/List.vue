<script>
import List from '@/components/generic/list';

export default {
  extends: List,
  computed: {
    patients() {
      return this.array;
    }
  }
}
</script>
<style lang="stylus" src="@/components/generic/list/style.styl"></style>

<template lang="pug">
  v-list.ku-list(
    :style=`{
        height: patients.length * 100 + "px"
      }`
  )
    v-list-tile.padded(
      v-for="(patient, i) in patients"
      :key="i"
      @click.stop="open(patient)"
    )
      v-list-tile-avatar
        img

      v-list-tile-content
        v-list-tile-title {{ patient.first_name }} {{ patient.last_name }}

      v-list-tile-action(
        @click.stop="$emit('openRoutine', patient.id)"
      )
        v-icon event
      v-list-tile-action(
        @click.stop="action(patient.id)"
      )
        v-icon(
          v-text='icon'
        )

</template>
