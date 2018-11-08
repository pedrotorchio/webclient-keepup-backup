<script>
import RoutineModel from '@/components/routines/RoutineModel';
export default {
  mixins: [ RoutineModel ],
  props: {
    routineId: {
      type: Number
    }
  },
  methods: {
    async loadRoutine() {
      this.routine = await this.$store.dispatch( 'fetchRoutine', this.routineId );
      
      this.routineLoaded();
    },
    routineLoaded() {},
  },
  created() {
    this.loadRoutine();
  }
}
</script>
