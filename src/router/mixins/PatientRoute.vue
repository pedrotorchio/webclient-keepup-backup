<script>
import { mapState } from 'vuex';

export default {
  props: {
    patientId: {
      type: Number
    }
  },
  methods: {
    async loadPatient() {
      await this.$store.dispatch( 'fetchPatient', this.patientId );

      this.onPatientLoaded();
    },
    onPatientLoaded() {},
  },
  created() {
    
    this.loadPatient();
  }
}
</script>
