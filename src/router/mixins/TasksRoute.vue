<script>
import RoutineRoute from './RoutineRoute';
import { parseDatetime, format } from '@/visualization/utils/time';
import { mapActions } from 'vuex';

export default {
  extends: RoutineRoute,
  methods: {
    ...mapActions([
      'fetchRoutineTasksForms',
      'fetchTasksForm',
    ]),
    onRoutineLoaded() {
     this.loadTasks(); 
    },
    async loadTasks() {
      this.forms = await this.fetchRoutineTasksForms(this.routineId);
      
      const formFetcher = this.forms.map( async form => await this.fetchTasksForm(form.id) );
      const forms = await Promise.all(formFetcher);
      this.tasks = forms.flatMap( form => form.tasks )
                        .map( task => {

          const timestring = `${task.time} ${this.routine.date}`;
          const moment = parseDatetime(timestring, true);
          
          task.start = moment.toDate();
          task.end   = moment.add(task.duration, 'm').toDate();
          
          return task;
          
        }).sort( ( task1, task2 ) => task1.start - task2.start );
        
        // this.tasksLoaded();

    },
    tasksLoaded() {}
  }
}
</script>
