export async function updateRoutine(data) {
  return this.$store.dispatch("updateRoutine", data);  
}
export async function createRoutine(data) {
  return this.$store.dispatch('createRoutine', data);
}