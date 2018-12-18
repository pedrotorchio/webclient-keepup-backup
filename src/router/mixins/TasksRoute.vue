<script>
import RoutineRoute from './RoutineRoute';
import { taskParser, taskChopper } from '@/visualization/utils/TaskParser';
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
        const parser = taskParser(this.routine);
        const parseAndLimit = task => taskChopper(parser(task));
        const dateSorter = ( task1, task2 ) => task1.start.getTime() - task2.start.getTime();

        form.tasks = form.tasks.map( parseAndLimit ).sort( dateSorter );

        return form;
      });
      
      this.extractTasks();
      this.tasksLoaded();

    },
    tasksLoaded() {}
  }
}
</script>
