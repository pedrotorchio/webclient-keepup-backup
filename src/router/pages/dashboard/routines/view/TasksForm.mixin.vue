<script>
import { mapActions } from 'vuex';

export default {
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
    }
  }
}
</script>
