<template>
    <div class="shoppingCart-contain">
        <div class="shoppingCart-contain-inner">
            <tab></tab>
            <shopping-list></shopping-list>
        </div>
    </div>
</template>

<script>
import tab from '@/components/tab/tab'
import shoppingList from '@/components/shoppingCart/shoppingList'

export default {
    components:{
        tab,
        shoppingList
    }
}
</script>

<style lang="scss">
    .shoppingCart-contain{
        // height: 1000px;
        background-color: rgba(255,255,255,.8);
        .shoppingCart-contain-inner{
            width: 90vw;
            margin: 0 auto;
            padding-bottom: 20px;
        }
    }
</style>