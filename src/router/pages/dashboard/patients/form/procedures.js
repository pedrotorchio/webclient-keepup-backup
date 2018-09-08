export async function updatePatient(data) {
  return this.$store.dispatch("updatePatient", data);  
}
export async function createPatient(data) {
  return this.$store.dispatch('createPatient', data);
}