<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <div id="link">
      <router-link to="/">app</router-link>
      <router-link to="/login">login</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'

export default {
  components: {
    Header,
    Footer,
  },
  mounted () {
    // console.log(this.$store)
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
#link{
  text-align center
  font-size 16px
  color: #fff
}
</style>


