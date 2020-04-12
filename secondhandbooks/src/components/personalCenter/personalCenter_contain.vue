<template>
    <div class="personal-center-contain">
        <my-menu></my-menu>
        <router-view></router-view>
    </div>
</template>

<script>
import myMenu from '@/components/personalCenter/personalCenter_menu.vue'
export default {
    components: {
        myMenu
    }
}
</script>

<style lang="scss">
    .personal-center-contain{
        min-height: 603px;
    }
</style>