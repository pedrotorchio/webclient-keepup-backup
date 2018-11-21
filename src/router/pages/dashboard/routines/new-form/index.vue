<script>
import Route from '@/router/pages/Route';
import RoutineRoute from '@/router/mixins/RoutineRoute';
import TasksFormRoute from '@/router/mixins/TasksFormRoute';
import NewForm from '@/components/tasks-form/Form';
import FormView from '@/components/generic/form/FormView.mixin';
import { mapActions } from 'vuex';


export default {
  extends: Route,
  mixins: [ TasksFormRoute, RoutineRoute, FormView ],
  components: { NewForm },
  methods: {
    ...mapActions({
      updateTasksForm: 'updateTasksForm',
      createTasksForm: 'createTasksForm'
    }),
    async submitProcedure(data) {
      
      let form;

      if (this.tasksForm) {

        data.id = this.tasksForm.id;
        form = await this.updateTasksForm(data);

      } else {
        const routineId = this.routineId;
        
        form = await this.createTasksForm({
          routineId,
          data  
        });

        this.$router.push({
          name: 'FormEdit',
          params: {
            formId: form.id
          }
        });
      }

      return form;
    }
  }
}

</script>
<template lang="pug">
  new-form(
    :model='tasksForm'
    @change='submit'
  )
</template>
