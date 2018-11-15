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
      
      this.routine = await this.$store.dispatch( 'fetchRoutine', this.routineId );
    
      this.onRoutineLoaded();
      
    },
    onRoutineLoaded() {},
  },
  created() {
    if (this.routineId) 
      this.loadRoutine();
  }
}
</script>
