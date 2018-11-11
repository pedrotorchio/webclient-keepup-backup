<script>
import {  Scales } from '@/visualization/tasks';

export default {
  data: () => ({
    scales: {
      moment: null,
      duration: null,
      independency: null,
      category: null,
      type: null
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
    }
  },
  methods: {
    async createVisualization() {

      const canvas = this.$refs.canvas; 
      const scales = new Scales(this.tasks);

      this.categories = scales.categories;
      this.timeExtent = scales.timeExtent;
      this.titles     = scales.titles;
      this.padding    = scales.padding;

      scales.setCanvasHeight(canvas.clientHeight);
      this.scales.height = scales.getHeightScale();
      this.scales.category = scales.getCategoryScale();
      this.scales.type = scales.getTypeScale();

      setTimeout(() => {
        
        this.scales.independency = scales.getIndependencyScale();
        
        scales.setCanvasWidth(canvas.clientWidth);
        this.scales.moment = scales.getMomentScale();
        this.scales.duration = scales.getDurationScale();


      }, 100);

    },

  }
}
</script>
