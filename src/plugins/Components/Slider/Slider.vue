<template lang="pug">
    .custom-slider
        input.slider( type="range"
            :value = "constrainedValue"
            @input = "input"
            v-on = "listeners"
            v-bind = "attrs"
        )
        label( v-if = "label") {{ label }}
</template>
<script>
export const MAIN_COLOR_PROPERTY_NAME = "--main-color"
export default {
    inheritAttrs: false,
    props: {
        value: Number,
        min: Number,
        max: Number,
        color: String,
        label: String
    },
    computed: {
        constrainedValue() {
            return this.constrain(this.value)
        },
        attrs() {
            const { value, min, max, color, textMapper, ...attrs } = this.$attrs;
            return attrs;
        },
        listeners() {
            const { input, ...listeners } = this.$listeners;
            return listeners;
        }
    },
    methods: {
        constrain(value) {
            return Math.max(Math.min(value, this.max), this.min)
        },
        input(event) {
            const value = parseInt(event.target.value);
            const range = this.constrain(value)
            this.$emit('input', range);
        }
    },
    watch: {
        color: {
            handler(value) {
                
                if (this.$el) {
                    const style = this.$el.style;
                    style.setProperty(MAIN_COLOR_PROPERTY_NAME, value)
                }
                
            }
        }
    }
}
</script>
<style lang="sass" scoped>
$default-thumb-color: green
$default-thumb-size: 6em
$default-trail-color: lightgrey
    
.custom-slider
    display: flex
    align-items: center
    color: inherit
    --main-color: #{$default-thumb-color}
    --bg-color: #{$default-trail-color}

input[type=range]

    flex: 1 1 100%
    width: 100%
    height: 2em
    outline: none
    opacity: 0.7
    -webkit-transition: .2s
    transition: opacity .2s

    background: $default-trail-color
    background: var( --bg-color , #{$default-trail-color} )

    &:hover
        opacity: 1

input[type="range"], 
input[type="range"]::-webkit-slider-thumb, 
input[type="range"]::-moz-range-thumb, 
input[type="range"]::-ms-thumb
    -webkit-appearance: none
    appearance: none

input[type=range]::-webkit-slider-thumb, input[type=range]::-moz-range-thumb, input[type=range]::-ms-thumb
    width: $default-thumb-size
    height: $default-thumb-size
    background: $default-thumb-color
    background: var( --main-color , #{$default-thumb-color} )
    border: 5px solid black
    cursor: pointer      

label
    flex: 1 0 auto
    margin-left: 1em    
</style>
