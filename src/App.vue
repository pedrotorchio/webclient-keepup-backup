<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
<style lang="stylus" src='@/styles/helper-classes.styl'></style>
<style lang="stylus" src='@/styles/reset.styl'></style>
<style lang="stylus">
html, body, #app
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;

body
  font-family: 'Open Sans', sans-serif;
  max-width: 100%;

  #app
    height: auto;
    min-height: 100%;
    max-width: 100%;


</style>

