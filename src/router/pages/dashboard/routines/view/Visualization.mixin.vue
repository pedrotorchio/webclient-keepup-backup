<script>
import {  Scales } from '@/visualization/tasks';
import { parse, format, isSameDay } from '@/visualization/utils/time';
import { TweenMax, Bounce } from 'gsap';

export default {
  data: () => ({
    scales: null,
    hasLoaded: false,
    hasMounted: false,
    doneScaling: false
  }),
  computed: {
    hourTickWidth() {
      if (!this.scales)
        return 0;

      const durationScale = this.scales.getDurationScale();

      return durationScale(60);
    },
    hasTasks() {
      return Boolean(this.scales) && this.scales.hasTasks();
    },
    rowHeight() {
      if (!this.scales)
        return 0;

      const heightScale = this.scales.getHeightScale();
      return heightScale();
    },
    padding() {
      if (!this.scales)
        return 0;

      return this.scales.padding;
    },
    canvasHeight() {
      if (!this.scales)
        return 0;
      
      const titles = this.scales.titles;

      return this.rowHeight * ( titles.length + 1 );
    },
  },
  methods: {
    format,
    jumpIntersection() {
      const intersection = this.$refs.intersection;
      
      TweenMax.from(intersection, 1, 
        {y:-100, autoAlpha: 0, ease:Bounce.easeOut});
    },
    doneShowing() {
      this.jumpIntersection();
    },
    tasksLoaded() {
      this.hasLoaded = true;
      this.scales = new Scales(this.allTasks);
    },
    getCanvasWidth() {
      
      if (!this.$refs.canvas)
        throw "CANVAS not mounted";
      
      return this.$refs.canvas.clientWidth;
    },
    
    async createVisualization() {

      setTimeout(() => {    

        this.scales.setCanvasWidth(this.getCanvasWidth());
        this.doneScaling = true;

      }, 0);

    },
  },
  mounted() {
    this.hasMounted = true;
  }
}
</script>
