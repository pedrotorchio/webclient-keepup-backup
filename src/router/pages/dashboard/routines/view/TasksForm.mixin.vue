<script>
import { mapActions } from 'vuex';

export default {
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
