<template>
  <div id="app">
    <IndexPage/>
  </div>
</template>

<script>
import IndexPage from './components/IndexPage.vue'

export default {
  name: 'App',
  components: {
    IndexPage
  }
}
</script>

<style lang="scss" global>
@import 'assets/styles/normalize.css';
@import 'assets/styles/inter-font.css';

@import 'assets/styles/variables.scss';
@import 'assets/styles/main.scss';

#app {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: $dark-turquoise;
}
</style>
