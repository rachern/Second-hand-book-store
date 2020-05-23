<template>
    <div class="find-books-result">
        <my-header></my-header>
        <contain :pageSize="pageSize"></contain>
        <my-footer></my-footer>
    </div>
</template>

<script>
import myHeader from '@/components/header/header.vue';
import contain from '@/components/findBooksResult/findBooksResult_contain.vue'
import myFooter from '@/components/footer/footer.vue'

export default {
    components: {
        myHeader,
        contain,
        myFooter
    },
    data() {
        return {
            pageSize: 12
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                const { query } = this.$route.params
                this.$store.dispatch('book/findBooks', { query, limit: this.pageSize })
            }
        }
    },
    created() {
        const { query } = this.$route.params
        this.$store.dispatch('book/findBooks', { query, limit: this.pageSize })
    }    
}
</script>

<style lang='scss'>
    .find-books-result{
        background-image: url('../assets/img/home_head_bg.jpg');
        background-size: contain;
    }
</style>