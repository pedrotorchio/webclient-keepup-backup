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
    hasTasks() {
      return Boolean(this.scales) && this.scales.hasTasks();
    },
    hours() {
      if (this.scales === null)
        return 0;

      const timeExtent = this.scales.timeExtent; 

      if (timeExtent.length == 0)
        return 0;
      
      const start = timeExtent[1].getHours();
      let end = timeExtent[0].getHours();

      if ( end < start )
        end = 24;


      return  end - start;
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
      
      this.scales = new Scales(this.allTasks);

      if (this.hasMounted)
        this.createVisualization();

    },
    getCanvasWidth() {
      
      if (!this.hasMounted || !this.$refs.canvas)
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
      const [ start, end ] = this.scales.timeExtent;

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
