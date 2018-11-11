<script>
import {  Scales } from '@/visualization/tasks';
import { parse, format } from '@/visualization/utils/time';

export default {
  data: () => ({
    scales: {
      moment: null,
      duration: null,
      independency: null,
      category: null,
      type: null,
      height: null
    },
    categories: [],
    timeExtent: [],
    titles: [],
    padding: 0
  }),
  computed: {
    hasScalesComputed() {
      return Boolean(
        this.scales.moment && 
        this.scales.duration && 
        this.scales.independency && 
        this.scales.category &&
        this.scales.type
      )
    },
    hasHeightScalesComputed() {
      return Boolean(
        this.scales.height && this.scales.category && this.scales.type
      );
    },
    hours() {
      if (this.timeExtent.length == 0)
        return 0;

      return this.timeExtent[1].getHours() - this.timeExtent[0].getHours();
    },
  },
  methods: {
    format,
    getCanvasHeight() {
      if (!this.$el || !this.$refs.xAxis)
        return 0;

      return this.$el.clientHeight - this.$refs.xAxis.clientHeight;
    },
    getCanvasWidth() {
      if (!this.$refs.canvas)
        return 0;
      
      return this.$refs.canvas.clientWidth;
    },
    getHourTickWidth(hour) {
      if (hour === this.hours + 1)
        return 'auto';
      

      return `${this.scales.duration(60)}px`;
    },  
    async createVisualization() {

      const scales = new Scales(this.tasks);

      this.categories = scales.categories;
      this.timeExtent = scales.timeExtent;
      this.titles     = scales.titles;
      this.padding    = scales.padding;

      scales.setCanvasHeight(this.getCanvasHeight());
      this.scales.height = scales.getHeightScale();
      this.scales.category = scales.getCategoryScale();
      this.scales.type = scales.getTypeScale();

      this.scales.independency = scales.getIndependencyScale();

      setTimeout(() => {
        
        scales.setCanvasWidth(this.getCanvasWidth());
        this.scales.moment = scales.getMomentScale();
        this.scales.duration = scales.getDurationScale();

      }, 100);

    },
    getNextHourTick(offset = 0) {
      const [ start ] = this.timeExtent;

      return parse(start.getHours() + offset, 'h');
    }
  }
}
</script>
