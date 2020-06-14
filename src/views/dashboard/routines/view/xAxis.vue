<script>
import { parse, format, isSameDay } from '@/visualization/utils/time';
import ArrayTransitioner from './ArrayTransitioner';
import { Expo, TweenMax } from 'gsap';
import { lg, md, sm, min } from 'media-query-mixins/_mixins.js';

export default {
    name: 'xAxis',
    extends: ArrayTransitioner,
    props: {
        timeExtent: {
            type: Array,
            required: true
        },
        durationScale: {
            type: Function,
            required: true
        }
    },
    computed: {
        tickWidth() {
            const [ start, end ] = this.hourExtent;

            const { result: duration } = 
                lg(() => 60 ) || 
                sm(() => (end-start) * 60 / 4) ||
                min(() => (end-start) * 60 / 2 );
            
            return this.durationScale(duration);
        },
        arraySize() {
            return this.hourCount;
        },
        hourCount() {
            const [ start, end ] = this.hourExtent;

            const { result: count } = 
                lg(() => end - start) || 
                sm(() => 4) ||
                min(() => 2 );

            return count;
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
        formatHour(number) {
            return format(parse(number, 'h'));
        },
        getNextHourTick(offset) {
            const [ start, end ] = this.hourExtent;

            const value = start + offset * ( end - start ) / this.hourCount;

            return format(parse(value, 'h'));
        },
        fadeIn(el, done) {
            const delay = el.dataset.index * this.delay;
            setTimeout(() => {
                TweenMax.from(el, this.duration, 
                {
                    autoAlpha: 0,
                    ease: Expo,
                    onComplete: done
                });

            }, delay);
        }
    }
}
</script>
<template lang="pug">
    transition-group#xAxis.xContainer( appear tag = "div" 
        v-on = "listeners" v-bind = "$attrs" 
        :css = "false"
        @after-enter = "afterEnter"
        @enter = "fadeIn"
    )
        .timeline( key = "timeline" )
            span.left-timeline-tick {{ formatHour(hourExtent[0]) }}
            span.center-timeline-tick Total de {{ (hourExtent[1] - hourExtent[0]) }}hrs
            span.right-timeline-tick {{ formatHour(hourExtent[1]) }}

        label.tick(
            v-for = "( hour, i ) in hourCount" :key = "hour"
            :style = "{ width: `${tickWidth}px` }"
            :data-index = "i"

        ) {{ getNextHourTick(hour - 1) }}
</template>
<style lang="stylus" scoped>
@import '~@/styles/colors'

$timeline-tick
    background-color: orange
    content: ''
    position: absolute
    height: 1.5em
    width: 2px

.timeline
    position: absolute
    top: 0
    left: 0
    right: 0
    height: 2px
    background-color: orange
    font-size: 14px

    .left-timeline-tick, .right-timeline-tick, .center-timeline-tick
        position: absolute
        height: 1.5em
        line-height: 1.5em
        font-size: 12px
        bottom: 100%
        padding: 0 5px
    
    .left-timeline-tick
        left: 0

        &:before
            @extend $timeline-tick
            left: 0
    .center-timeline-tick
        left: 50%
        transform: translateX(-50%)

    .right-timeline-tick
        right: 0

        &:after
            @extend $timeline-tick
            right: 0

.xContainer
    display flex
    position: relative
.tick
    visibility hidden
    display inline-block
</style>

