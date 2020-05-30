<template>
    <div class="page_404" @click="returnBack">
        <img :src="url" />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: require('../assets/img/404.gif')
            }
        },
        methods: {
            returnBack() {
                this.$router.push({path: '/'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page_404{
        width: 100%;
        height: 100%;
        img{
            height: 99%;
            width: 100%;
        }
    }
</style>