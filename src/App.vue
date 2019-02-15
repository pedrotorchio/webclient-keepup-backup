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
<style lang="stylus" src='@/styles/animations.styl'></style>
<style lang="stylus" src='@/styles/helper-classes.styl'></style>
<style lang="stylus" src='@/styles/reset.styl'></style>
<style lang="css" src='@/styles/icons.css'></style>
<style lang="stylus">
@import '~@/styles/colors'

html, body, .application
  height: 100%;
  height: 100vh;

a
  text-decoration: none !important;

.v-dialog
  box-shadow: none !important;

 .stylish-scrollbar
    &::-webkit-scrollbar
      width: .1em;
    
    &::-webkit-scrollbar-track
      -webkit-box-shadow: inset 0 0 6px transparent;
    
    &::-webkit-scrollbar-thumb
      background-color: orange;
      outline: 1px solid slategrey;

.loading-container
  .indeterminate-loading
    background-color orange
    visibility: hidden
  &.loading
    & > .indeterminate-loading
      visibility: visible
  

</style>
