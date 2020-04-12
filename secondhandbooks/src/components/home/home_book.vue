<template>
    <div class="pointer book" @click="selectBook(book_message._id)">
        <div class="img"><img :src="book_message.url" :title="book_message.title" :alt="book_message.title"></div>
        <p class="bookName" :title="book_message.title">{{book_message.title}}</p>
        <p class="bookAuthor">{{book_message.author}}</p>
        <p class="bookPrice">￥{{book_message.presentPrice.toFixed(2)}}</p>
    </div>
</template>

<script>
export default {
    props:['book_message'],
    methods: {
        selectBook(id) {
            // console.log(id)
            this.$router.push({ path: `/CommodityDetail/${id}` })
        }
    }
}
</script>

<style lang='scss'>
    .book{
        height: 265px;
        display: inline-block;
        overflow: hidden;
        width: 20%;
        padding-top: 10px;
        &:hover{
            border: 1px solid rgb(187, 180, 180);
            border-radius: 10px;
        }
        .img{
            text-align: center;
            img{
                height: 160px;
                max-width: 160px;
                max-height: 160px;
            }
        }
        .bookName{
            color: black;
            padding-top: 5px;
            width: 80%;
            margin: 0 auto;
            font-size: 13px;
            height: 32px;
            line-height: 14px;
            overflow: hidden;
            font-weight: bold;
        }
        .bookAuthor{
            width: 80%;
            margin: 0 auto;
            color: black;
            font-size: 12px;
            height: 24px;
            line-height: 24px;
            overflow: hidden;
        }
        .bookPrice{
            width: 80%;
            margin: 0 auto;
            font-size: 15px;
            font-weight: bold;
            color: #DA0000;
        }
    }
</style>