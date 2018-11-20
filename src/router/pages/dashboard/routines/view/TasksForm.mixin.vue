<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    formsColorScale() {
      if (!this.scales)
        return () => 'blue';
      
      return this.scales
                 .getColorScale([ '#009688', '#2196f3' ])
                 .domain([0, this.forms.length - 1]);
    },
    allTasks() {
      if (!this.forms)
        return [];

      return this
                .forms
                .flatMap( form => form.tasks )
                .sort( ( task1, task2 ) => task1.start - task2.start );
    }
  },
  methods: {
    ...mapActions({
      updateTasksForm: 'updateTasksForm'
    }),
    async toggleForm(formId) {
      const index = this.forms.findIndex( form => form.id === formId );    
      
      let { id, visibility } = this.forms[index];
      visibility = !visibility;

      await this.updateTasksForm({
        id,
        visibility
      });

      this.forms[index].visibility = visibility;
      
      this.extractTasks();
    },
    extractTasks() {
      this.tasks = this
                      .forms
                      .filter( form => form.visibility )
                      .flatMap( form => form.tasks ) // merge tasks
                      .sort( ( task1, task2 ) => task1.start - task2.start );
    }
  }
}
</script>
