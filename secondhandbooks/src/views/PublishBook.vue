<template>
    <div class="publish-book">
        <my-header></my-header>
        <contain></contain>
        <my-footer></my-footer>
    </div>
</template>

<script>
import myHeader from '@/components/header/header';
import contain from '@/components/publishBook/publishBook_contain';
import myFooter from '@/components/footer/footer'

export default {
    components:{
        myHeader,
        contain,
        myFooter
    }
}
</script>

<style lang="scss">
    .publish-book{
        background-image: url('../assets/img/home_head_bg.jpg');
        background-size: contain;
        // height: 1000px;
        // background-repeat: no-repeat;
    }
</style>