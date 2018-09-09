<script>
import { mapState } from 'vuex';

export default {
  props: {
    patientId: {
      type: Number | Boolean,
      default: false
    },
  },
  computed: {
    ...mapState({
      patients: state => state.patients.patients,
    }),
    patient() {
      let patient = false;
      
      if (this.patientId !== 'novo') {
        patient = this.patients.find(patient => patient.id == this.patientId)
      }

      return patient || false;
    },
  },
}
</script>
