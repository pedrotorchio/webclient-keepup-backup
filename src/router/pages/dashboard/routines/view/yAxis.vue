<script>
import ArrayTransitioner from './ArrayTransitioner';
import { TweenMax, Expo } from 'gsap';

let enterCount = 0;

export default {
    mixins: [ ArrayTransitioner ],
    props: {
        titles : {
            type: Array,
            required: true
        },
        rowHeight: {
            type: Number,
            required: true
        },
        innerPadding: {
            type: Number,
            required: true
        }
    },
    computed: {
        arraySize() {
            return this.titles.length;
        }
    },
    methods: {
        slideIn(el, done) {
            const delay = el.dataset.index * this.delay;

            setTimeout(() => {
                TweenMax.fromTo(el, this.duration, 
                {
                    x: -40,
                    autoAlpha: 0
                },
                {
                    onComplete: done,
                    x: 0,
                    autoAlpha: 1
                });

            }, delay);
        }
    }
}
</script>
<template lang="pug">
    transition-group#yAxis( appear tag = "div" 
        v-on = "$listeners" v-bind = "$attrs" 
        :css = "false"
        @after-enter = "entered"
        @enter = "slideIn"
    )
        h2.task-title(
            v-for = "(title, i) in titles" :key = "title"
            :style = "{ height: `${rowHeight}px`, lineHeight: `${rowHeight}px`, padding: innerPadding }"
            :data-index = "i"
        ) {{ title }}
</template>
<style lang="stylus" scoped>
    #yAxis
        .task-title
            box-sizing: border-box;
            white-space: nowrap;
            font-weight bold;
            text-align: left;
            visibility hidden

</style>
