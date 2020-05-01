<template>
    <div class="classification-showBooks">
        <book style="width: 16.6%" v-for="(book,index) in classificationBooks" :key="index" :book_message="book"></book>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import book from '@/components/home/home_book'

export default {
    components:{
        book
    },
    computed: {
        ...mapGetters([
            'classificationBooks'
        ])
    }
}
</script>

<style lang="scss">
    .classification-showBooks{
        border: 1px solid rgb(223, 220, 220);
        margin-top: 2vh;
        text-align: left;
    }
</style>