<script>
export default {
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    selected: false
  })
}
</script>
<template lang="pug">
  div.task(
    :class = `{ selected }`
  )
</template>
