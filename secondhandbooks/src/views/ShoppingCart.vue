<template>
    <div class="shopping_cart">
        <my-header></my-header>
        <contain></contain>
        <my-footer></my-footer>
    </div>
</template>

<script>
import myHeader from '@/components/header/header';
import contain from '@/components/shoppingCart/shoppingCart_contain';
import myFooter from '@/components/footer/footer'

export default {
    components: {
        myHeader,
        contain,
        myFooter
    },
    created() {
        this.$store.dispatch('user/getMyCartList')
    }
}
</script>

<style lang="scss">
    .shopping_cart{
        background-image: url('../assets/img/home_head_bg.jpg');
        background-size: contain;
    }
</style>