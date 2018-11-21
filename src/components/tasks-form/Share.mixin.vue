<script>
import { mapActions, mapState } from 'vuex';

export default {
  methods: {
    shareOnWhatsapp() {
      window.open(this.whatsappShareUrl, '_blank');
    },
    ...mapActions({
      fetchPatient: 'fetchPatient'
    }),
  },
  computed: {
    ...mapState({
      patient: state => state.patients.patient
    }),
    urlRoute() {
      if (!this.model)
        return;

      const formId = this.model.id;
      return {
        name: 'TasksForm',
        params: {
          formId
        }
      }
    },
    url() {
      if (!this.model)
        return;

      return window.location.origin + this.$router.resolve(this.urlRoute).href
    },
    whatsappShareUrl() {
      
      if (!this.model || !this.patient)
        return;

      const text = `Por favor, clique no link a seguir e preencha o formulário com informações da rotina de ${this.patient.first_name} ${this.patient.last_name}
${this.url}
`;
      const escapedUrl = encodeURI(text);

      const url = `https://wa.me/?text=${escapedUrl}`;

      return url;
    },
  },
  watch: {
    model() {
      this.fetchPatient(this.model.routine.patient_id);
    }
  }
}
</script>
