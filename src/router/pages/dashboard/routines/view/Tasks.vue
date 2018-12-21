<script>
import { parse, format, isSameDay } from '@/visualization/utils/time';
import ArrayTransitioner from './ArrayTransitioner';
import { Expo, TweenMax } from 'gsap';
import Task from '@/components/tasks/Task';

export default {
    name: 'Tasks',
    extends: ArrayTransitioner,
    components: { Task },
    props: {
        scales: {
            type: Object,
            required: true
        },
        tasks: {
            type: Array,
            required: true
        }
    },
    computed: {
        listeners() {
            const { 
                "before-enter": beforeEnter, 
                "after-enter": afterEnter, 
                "done-showing": doneShowing,
                "before-showing": beforeShowing,
                enter, click, change,
                ...listeners } = this.$listeners;

            return listeners;
        },
        arraySize() {
            return this.tasks.length;
        }
    },
    methods: {
        grow(el, done) {
            const i = el.dataset.index;
            const delay = i * this.delay;
            const task = this.$refs.tasks[i];
            
            setTimeout(() => {
                task.grown = true;
                done();
            }, delay);
        }
    }
}
</script>
<template lang="pug">
    transition-group#tasks( appear tag = "div" 
        v-on = "listeners" v-bind = "$attrs"
        :css = "false"
        @after-enter = "afterEnter"
        @enter = "grow"
    )    
        task(
          v-for = '(task, i) in tasks' :key = 'task.id'
          ref = "tasks"
          :data-index = "i"
          @click = "$listeners.click"
          @change = '$listeners.change'
          :model = 'task'
          :durationScale = 'scales.getDurationScale()'
          :independencyScale = 'scales.getIndependencyScale()'
          :momentScale = 'scales.getMomentScale()'
          :heightScale = 'scales.getHeightScale()'
          :categoryScale = 'scales.getCategoryScale()'
          :typeScale = 'scales.getTypeScale()'
        ) {{ scales.getDurationScale(task.duration) }}
</template>
<style lang="stylus" scoped>
    .task
        animation-duration: 500ms;
        animation-timing-function: cubic-bezier(0.29, 0.73, 0.2, 0.99);

        transform scaleX(0)
        &.growX
            transform scaleX(1)

</style>
