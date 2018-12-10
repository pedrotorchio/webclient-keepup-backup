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
      
      const patient = await this.$store.dispatch( 'fetchPatient', this.patientId );

      this.onPatientLoaded();
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
