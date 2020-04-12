<template>
    <div class="classification">
        <my-header></my-header>
        <contain :pageSize="pageSize"></contain>
        <my-footer></my-footer>
    </div>
</template>

<script>
import myHeader from '@/components/header/header.vue';
import contain from '@/components/classification/classification_contain.vue'
import myFooter from '@/components/footer/footer.vue'

export default {
    components: {
        myHeader,
        contain,
        myFooter
    },
    data() {
        return {
            pageSize: 10
        }
    },
    created() {
        console.log(this.$route.params.id)
        const { id } = this.$route.params
        this.$store.dispatch('book/getClassificationBooks', { id, limit: this.pageSize })
    }    
}
</script>

<style lang='scss'>
    .classification{
        background-image: url('../assets/img/home_head_bg.jpg');
        background-size: contain;
    }
</style>