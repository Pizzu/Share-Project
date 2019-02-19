<template>
  <v-app style="background-color: #f7f7f7">
    <Header />
    <router-view></router-view>
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">

</style>

