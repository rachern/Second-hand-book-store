<template>
    <div class="commodity-detail">
        <my-header id="header"></my-header>
        <contain :pageSize="pageSize"></contain>
        <my-footer></my-footer>
    </div>
</template>

<script>
import myHeader from '@/components/header/header'
import contain from '@/components/commodityDetail/commodityDetail_contain'
import myFooter from '@/components/footer/footer'

export default {
    components:{
        myHeader,
        contain,
        myFooter
    },
    data() {
        return {
            pageSize:10
        }
    },
    created() {
        const { id } = this.$route.params
        this.$store.dispatch('book/getBookDetail', id)
        this.$store.dispatch('comment/getComments', { id, limit: this.pageSize })
    }
}
</script>

<style lang="scss">
    .commodity-detail{
        background-image: url('../assets/img/home_head_bg.jpg');
        background-size: contain;
    }
</style>