<script>
import yAxis from './yAxis';
import { TweenMax, Expo } from 'gsap';

export default {
    extends: yAxis,
    methods: {
        fadeIn(el, done) {
            const delay = el.dataset.index * this.delay;
            
            setTimeout(() => {
                TweenMax.from(el, this.duration, 
                {
                    autoAlpha: 0,
                    ease: Expo
                });

                done();

            }, delay);
        }
    }
}
</script>
<template lang="pug">
    transition-group#rows( appear tag = "div"
        v-on = "$listeners" v-bind = "$attrs" 
        :css = "false"
        @after-enter = "entered"
        @enter = "fadeIn"
    )
        p.tick(  v-for = "(title, i) in titles" :key = "title"
            :style = "{ height: `${rowHeight}px`, lineHeight: `${rowHeight}px`, padding: innerPadding }"
            :data-index = "i"   )
</template>
<style lang="stylus" scoped>
    .tick
        visibility hidden
</style>