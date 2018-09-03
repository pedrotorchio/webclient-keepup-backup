<script>
import SignupForm from '@/components/signup/form';

export default {
  components: {
    SignupForm
  }  
}
</script>
<template lang="pug">
  form#signup-form
    signup-form
</template>
<style lang="stylus" scoped>
#signup-form
  max-width: 400px;
</style>
