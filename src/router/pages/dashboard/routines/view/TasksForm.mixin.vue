<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      updateTasksForm: 'updateTasksForm'
    }),
    toggleForm(formId) {
      const { id, visibility } = this.forms.find( form => form.id === formId );    

      this.updateTasksForm({
        id,
        visibility: !visibility
      });
    }
  }
}
</script>
