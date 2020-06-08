<script>
import { mapActions } from 'vuex';

export default {
  props: {
    formId: {
      type: Number
    }
  },
  data: () => ({
    tasksForm: null
  }),
  methods: {
    ...mapActions({
      fetchTasksForm: 'fetchTasksForm'
    }),
    async loadTasksForm() {
      this.setGlobalLoading(true)
      this.tasksForm = await this.fetchTasksForm( this.formId );
      
      this.onTasksFormLoaded();
      this.setGlobalLoading(false)
    },
    onTasksFormLoaded() {},
  },
  created() {
    if (this.formId)
      this.loadTasksForm();
  }
}
</script>
