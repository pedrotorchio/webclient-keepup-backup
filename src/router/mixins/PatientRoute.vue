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
      patient: state => state.patients.patient
    })
  },
  methods: {
    async loadPatient() {
      const patient = await this.$store.dispatch( 'fetchPatient', this.patientId );

      this.onPatientLoaded();
    },
    onPatientLoaded() {},
  },
  created() {
    if (this.patientId)
      this.loadPatient();
  }
}
</script>
