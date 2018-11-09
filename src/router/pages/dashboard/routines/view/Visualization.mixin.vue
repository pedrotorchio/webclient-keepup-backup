<script>
import {  Scales } from '@/visualization/tasks';

export default {
  data: () => ({
    scales: {
      moment: null,
      duration: null,
      independency: null,
      category: null
    }

  }),
  methods: {
    async createVisualization() {

      const scales = new Scales(this.tasks, this.$el.clientWidth, this.$el.clientHeight);

      this.scales.moment = scales.getMomentScale();
      this.scales.duration = scales.getDurationScale();
      this.scales.independency = scales.getIndependencyScale();
      this.scales.category = scales.getCategoryScale();
      this.scales.height = scales.getHeightScale();

      // this.scales.height = categoryScale(this.tasks, this.canvasVerticalRange);


    }
  }
}
</script>
