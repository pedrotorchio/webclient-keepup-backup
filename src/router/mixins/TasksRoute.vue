<script>
import RoutineRoute from './RoutineRoute';
import { parseDatetime, format } from '@/visualization/utils/time';
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
      
      this.tasks = this.tasks.map( task => {
        const timestring = `${task.time} ${this.routine.date}`;
        const moment = parseDatetime(timestring, true);
        
        task.start = moment.toDate();
        task.end   = moment.add(task.duration, 'm').toDate();
        
        return task;
        
      }).sort( ( task1, task2 ) => task1.start - task2.start );
      
      this.tasksLoaded();
    },
    tasksLoaded() {}
  }
}
</script>
