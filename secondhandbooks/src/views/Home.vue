<template>
  <div class="home">
    <my-header></my-header>
    <contain></contain>
    <my-footer></my-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import myHeader from '@/components/header/header.vue';
import contain from '@/components/home/home_contain.vue';
import myFooter from '@/components/footer/footer.vue';

export default {
  name: 'home',
  components: {
    myHeader,
    contain,
    myFooter
  },
  created() {
    this.$store.dispatch('carousel/getCarousel')
    this.$store.dispatch('booktype/getBookType').then(() => {
      this.$store.dispatch('book/getHomeBooks',this.booktypes[0].level_2)
    })
  },
  computed:{
    ...mapGetters([
      'booktypes'
    ])
  }
}
</script>

<style lang="scss">
  .home{
    background-image: url('../assets/img/home_head_bg.jpg');
    background-size: contain;
    // background-repeat: no-repeat;
  }
</style>
