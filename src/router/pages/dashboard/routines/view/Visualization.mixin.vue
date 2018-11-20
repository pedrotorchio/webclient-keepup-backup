<script>
import {  Scales } from '@/visualization/tasks';
import { parse, format } from '@/visualization/utils/time';

export default {
  data: () => ({
    scales: null,
    hasLoaded: false,
    hasMounted: false,
    doneScaling: false
  }),
  computed: {
    hours() {
      const timeExtent = this.scales.timeExtent; 

      if (timeExtent.length == 0)
        return 0;

      return timeExtent[1].getHours() - timeExtent[0].getHours();
    },
    taskCount() {
      return this.tasks.length;
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
    rowStyle() {
      return { 
        height: `${this.rowHeight}px`, 
        padding: `${this.padding}px`  
      }
    },
    tasksLoaded() {
      
      this.hasLoaded = true;
      this.scales = new Scales(this.tasks);

      if (this.hasMounted)
        this.createVisualization();
    },
    getCanvasWidth() {
      
      if (!this.hasMounted)
        return 0;
      
      return this.$refs.canvas.clientWidth;
    },
    getHourTickWidth(hour) {
      
      if (hour === this.hours + 1)
        return 'auto';
      
      const durationScale = this.scales.getDurationScale();

      return `${durationScale(60)}px`;
    },  
    async createVisualization() {

      setTimeout(() => {
        
        this.scales.setCanvasWidth(this.getCanvasWidth());
        this.doneScaling = true;

      }, 1000);

    },
    getNextHourTick(offset = 0) {
      const [ start ] = this.scales.timeExtent;

      return parse(start.getHours() + offset, 'h');
    }
  },
  mounted() {
    this.hasMounted = true;
    if (this.hasLoaded)
      this.createVisualization();
  }
}
</script>
