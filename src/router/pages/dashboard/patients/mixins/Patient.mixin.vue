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
  methods: {
    watchPatient(data) {}
  },
  watch: {
    patient: {
      deep: true,
      handler(data) {
        this.watchPatient(data);
      }
    }
  },
  created() {
    this.$store.dispatch('patients/fetchPatient');
  }
}
</script>
