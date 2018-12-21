<script>
import { parse, format, isSameDay } from '@/visualization/utils/time';
import ArrayTransitioner from './ArrayTransitioner';
import { Expo, TweenMax } from 'gsap';

export default {
    mixins: [ ArrayTransitioner ],
    props: {
        tickWidth: {
            type: Number,
            required: true
        },
        timeExtent: {
            type: Array,
            required: true
        }
    },
    computed: {
        arraySize() {
            return this.hourCount;
        },
        hourCount() {
            const [ start, end ] = this.hourExtent;

            return end - start;
        },
        hourExtent() {
            if (this.timeExtent.length < 2)
                return [];
            
            const [ startTime, endTime ] = this.timeExtent;

            const start = startTime.getHours();
            const end   = isSameDay(startTime, endTime) ? endTime.getHours() : 24;

            return [start, end];
        }
    },
    methods: {
        getNextHourTick(offset) {
            const [ start, end ] = this.hourExtent;

            return format(parse(start + offset, 'h'));
        },
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
    transition-group#xAxis( appear tag = "div" 
        v-on = "$listeners" v-bind = "$attrs" 
        :css = "false"
        @after-enter = "entered"
        @enter = "fadeIn"
    )    
        label.tick(
            v-for = "( hour, i ) in hourCount" :key = "hour"
            :style = "{ width: `${tickWidth}px` }"
            :data-index = "i"

        ) {{ getNextHourTick(hour - 1) }}
</template>
<style lang="stylus" scoped>
    .tick
        visibility hidden
        display inline-block
</style>

