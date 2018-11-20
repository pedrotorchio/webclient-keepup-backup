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
    extractTasks() {},
    async loadTasks() {
      this.forms = await this.fetchRoutineTasksForms(this.routineId);
      
      const formFetcher = this.forms.map( async form => await this.fetchTasksForm(form.id) );
      this.forms = await Promise.all(formFetcher);

      this.forms = this.forms.map( form => { // for each form

        form.tasks = form.tasks.map( task => { // transform each of its tasks

          const timestring = `${task.time} ${this.routine.date}`;
          const moment = parseDatetime(timestring, true);
          
          task.start = moment.toDate();
          task.end   = moment.add(task.duration, 'm').toDate();
          
          return task;
          
        });

        return form;
      })
      
      this.extractTasks();
      this.tasksLoaded();

    },
    tasksLoaded() {}
  }
}
</script>
