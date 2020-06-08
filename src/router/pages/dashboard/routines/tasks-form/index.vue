<script>
import Route from '@/router/pages/Route';
import RoutineRoute from '@/router/mixins/RoutineRoute';
import TasksFormRoute from '@/router/mixins/TasksFormRoute';
import TasksForm from '@/components/tasks-form/Form';
import FormView from '@/components/generic/form/FormView.mixin';
import { mapActions } from 'vuex';


export default {
  extends: Route,
  mixins: [ TasksFormRoute, RoutineRoute, FormView ],
  components: { TasksForm },
  methods: {
    ...mapActions({
      updateTasksForm: 'updateTasksForm',
      createTasksForm: 'createTasksForm',
      deleteTasksForm: 'deleteTasksForm'
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
    },
    onTasksFormLoaded() {
      this.defineActions();
    },
    async deleteForm() {
      
      await this.deleteTasksForm(this.tasksForm.id);
      
      const routineId = this.tasksForm.routine_id;
      this.$router.push({
        name: 'TasksView',
        params: {
          routineId
        }
      })

    },
    defineActions() {
      let routineId;
      
      if (this.routineId)
        routineId = this.routineId;

      else if (this.tasksForm) {
        routineId = this.tasksForm.routine_id;
        this.rootActions.push({
          tip: 'Excluir', 
          click: this.deleteForm,
          color: 'error', 
          icon: 'clear' 
        });
      }

      else
        return;
      
      this.rootActions.push({
        tip: 'Retornar', 
        to: { 
          name: 'TasksView',
          params: {
            routineId
          }
        }, 
        color: 'secondary', 
        icon: 'arrow_back' 
      });
    },
  },
  computed: {
    items() {
      const routine = this.routine || (this.tasksForm && this.tasksForm.routine);
      let items = [];

      if (routine && routine.patient) {
        items = routine.patient.caregivers;
      }

      return items;
    }
  },
  created() {
    this.defineActions();
  }

}

</script>
<template lang="pug">
  tasks-form(
    :items = 'items'
    :model='tasksForm'
    @change='submit'
  )
</template>
