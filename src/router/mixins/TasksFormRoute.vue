<script>
import { mapActions } from 'vuex';

export default {
  props: {
    tasksFormId: {
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
      this.tasksForm = await this.fetchTasksForm( this.patientId );

      this.onTasksFormLoaded();
    },
    onTasksFormLoaded() {},
  },
  created() {
    if (this.tasksFormId)
      this.loadTasksForm();
  }
}
</script>
