<template>
    <div class="shopping-process">
        <my-header></my-header>
        <contain></contain>
        <my-footer></my-footer>
    </div>
</template>

<script>
import myHeader from '@/components/header/header';
import contain from '@/components/shoppingProcess/shoppingProcess_contain';
import myFooter from '@/components/footer/footer'

export default {
    components: {
        myHeader,
        contain,
        myFooter
    }
}
</script>

<style lang="scss">
    .shopping-process{
        background-image: url('../assets/img/home_head_bg.jpg');
        background-size: contain;
    }
</style>