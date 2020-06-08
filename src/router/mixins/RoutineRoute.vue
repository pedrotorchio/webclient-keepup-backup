<script>
import RoutineModel from '@/components/routines/RoutineModel';
export default {
  mixins: [ RoutineModel ],
  props: {
    routineId: {
      type: Number
    }
  },
  data: () => ({
    routine: null
  }),
  methods: {
    async loadRoutine() {
      this.setGlobalLoading(true)
      this.routine = await this.$store.dispatch( 'fetchRoutine', this.routineId );
      
      this.onRoutineLoaded();
      this.setGlobalLoading(false)
    },
    onRoutineLoaded() {},
  },
  created() {
    if (this.routineId) 
      this.loadRoutine();
  }
}
</script>
