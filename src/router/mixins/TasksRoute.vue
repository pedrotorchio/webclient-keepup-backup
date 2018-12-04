<script>
import RoutineRoute from './RoutineRoute';
import { taskParser } from '@/visualization/utils/TaskParser';
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

        form.tasks = form.tasks.map( taskParser(this.routine) );

        return form;
      })
      
      this.extractTasks();
      this.tasksLoaded();

    },
    tasksLoaded() {}
  }
}
</script>
