<script>

export default {
  props: {
    patientId: {
      type: Number
    }
  },
  computed: {
    patient: {
      set (patient) {
        this.$store.state.patients.patient = patient;
      },
      get () {
        return this.$store.state.patients.patient;
      }
    }
  },
  methods: {
    async loadPatient() {
      this.setGlobalLoading(true)
      const patient = await this.$store.dispatch( 'fetchPatient', this.patientId );

      this.onPatientLoaded();
      this.setGlobalLoading(false)
    },
    onPatientLoaded() {},
  },
  created() {
    if (this.patientId)
      this.loadPatient();
    else  
      this.patient = null;
  }
}
</script>
