<template>
  <v-app id="app">
    <router-view ref="route"/>
    <strong id = "global-message" :class="[ globalMessage.type, globalMessage.shown ? 'shown' : 'hidden' ]"> {{ globalMessage.value }} </strong>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState({
      globalMessage: state => state.system.message
    })
  }
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
  &:hover
    color: orange

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

#global-message
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  padding: 1em
  height: 100px
  position: fixed
  bottom: 0
  transition: transform .5s ease-out
  color: white;
  font-weight: normal;
  text-align: center;

  &.hidden
    transform: translateY(100px)
    transition: transform 1s ease-out




</style>
