<script>
import TasksRoute from '@/router/mixins/TasksRoute';
import { mapActions } from 'vuex';

export default {
  extend: TasksRoute,
  methods: {
    ...mapActions({
      updateFormsTask: 'updateFormsTask'
    }),
    toggleForm(id) {
      const index = this.forms.findIndex( form => form.id === id );
      
      console.log(this.forms[index].visibility);
    }
  }
}
</script>
