<script>
export default {
  props: {
    value: {
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary"
    },
    icon: {
      type: String,
      required: false
    },
    append: {
      type: String,
      default: ''
    }
  },
  
}
</script>
<template lang="pug">
  div.input
    v-icon( v-if = "icon" :color="color") {{icon}}
    span.text( v-if = "!editable" ) {{ value + append }}
    input.text( v-else
      :value = "value"
      @input = "$emit('update:value', value)"
    )
    span.append( v-if = "editable && append") {{ append }}
</template>

<style lang="stylus" scoped>

.input 
  font-size 18px;
.text
  white-space nowrap
  margin .5em 0
  
.v-icon
  margin-right .5em !important;

</style>
