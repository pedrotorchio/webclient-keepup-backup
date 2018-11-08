<script>
import { mapState } from 'vuex';

export default {
  props: {
    patientId: {
      type: Number
    }
  },
  computed: {
    ...mapState({
      patients: state => state.patients.patients,
      patient: state => state.patients.patient
    }),
  },
  methods: {
    async loadPatient() {
      await this.$store.dispatch( 'fetchPatient', this.patientId );

      this.patientLoaded();
    },
    patientLoaded() {},
  },
  created() {
    
    this.loadPatient();
  }
}
</script>
