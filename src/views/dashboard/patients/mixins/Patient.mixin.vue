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
      patient: state => state.patients.patient
    }),
  },
  created() {
    this.setGlobalLoading(true)

    this.$store.dispatch('fetchPatient', this.patientId)
        .then(()=>this.setGlobalLoading(false))

  }
}
</script>
