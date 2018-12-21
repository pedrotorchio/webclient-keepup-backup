<script>
import xAxis from './xAxis';
export default {
    extends: xAxis,
}
</script>
<template lang="pug">
    transition-group#columns( appear tag = "div" 
        v-on = "$listeners" v-bind = "$attrs" 
        :css = "false"
        @after-enter = "entered"
        @enter = "fadeIn"
    )
        p.tick(  v-for = "( hour, i ) in hourCount" :key = "hour"
            :style = "{ width: `${tickWidth}px` }"
            :data-index = "i"   )
</template>
