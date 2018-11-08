<script>
import RoutineRoute from './RoutineRoute';
import { mapActions } from 'vuex';

export default {
  extends: RoutineRoute,
  methods: {
    ...mapActions([
      'fetchRoutineTasks'
    ]),
    routineLoaded() {
     this.loadTasks(); 
    },
    async loadTasks() {
      this.tasks = await this.fetchRoutineTasks(this.routineId);
      this.tasksLoaded();
    },
    tasksLoaded() {}
  }
}
</script>
