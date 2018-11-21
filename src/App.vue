<template>
  <v-app id="app">
    <router-view ref="route"/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>
<style lang="stylus" src='@/styles/helper-classes.styl'></style>
<style lang="stylus" src='@/styles/reset.styl'></style>
<style lang="css" src='@/styles/icons.css'></style>
<style lang="stylus">
html, body, .application
  height: 100%;
  height: 100vh;

a
  text-decoration: none !important;

.v-dialog
  box-shadow: none !important;
</style>
