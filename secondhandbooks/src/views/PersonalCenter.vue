<template>
    <div class="personal-center">
        <my-header></my-header>
        <contain></contain>
        <my-footer></my-footer>
    </div>
</template>

<script>
import myHeader from '@/components/header/header.vue';
import contain from '@/components/personalCenter/personalCenter_contain.vue'
import myFooter from '@/components/footer/footer.vue'

export default {
    components: {
        myHeader,
        contain,
        myFooter
    }
}
</script>

<style lang="scss">
    .personal-center{
        background-color: #f0f3ef;
    }
</style>