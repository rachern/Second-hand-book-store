<template>
    <div class="carousel-map-management clearfix">
        <div class="carousel" v-for="(carousel,index) in carousels" :key="index">
            <div class="img-wrap">
                <img :src="carousel.url">
            </div>
            <span class="delete">
                <i class="el-icon-error"></i>
            </span>
        </div>
        <el-upload action="#" 
                    accept="image/png, image/jpeg"
                    list-type="picture-card" 
                    ref="carouselUpload"
                    multiple
                    :auto-upload="false"
                    :file-list="fileList"
                    :on-change="handleChange">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            carousels: [
                {url:require('../../assets/img/carousel/carousel1.jpg')},
                {url:require('../../assets/img/carousel/carousel2.jpg')},
                {url:require('../../assets/img/carousel/carousel3.jpg')},
                {url:require('../../assets/img/carousel/carousel4.jpg')},
                {url:require('../../assets/img/carousel/carousel5.jpg')},
                {url:require('../../assets/img/carousel/carousel6.jpg')},
                {url:require('../../assets/img/carousel/carousel7.jpg')},
                {url:require('../../assets/img/carousel/carousel8.jpg')}
            ],
            fileList: [],
            picList: [],
            dialogImageUrl: '',
            dialogVisible: false,
        }
    },
    methods: {
        handleChange(file, fileList) {
            this.picList.push(file.raw)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
}
</script>

<style lang="scss">
    .carousel-map-management{
        .el-upload-list--picture-card{
            float: left;
            // padding-right: 15px;
        }
        .el-upload-list--picture-card .el-upload-list__item{
            width: 40vw;
            margin-right: 15px;
            margin-bottom: 20px;
            float: left;
        }
        .el-upload--picture-card{
            width: 40vw;
            // float: left;
        }
        // height: 644px;
        // background-color: pink;
        padding: 20px;
        // display: flex;
        .carousel{
            float: left;
            width: 40vw;
            min-width: 520px;
            margin-right: 15px;
            margin-bottom: 20px;
            font-size: 0;
            position: relative;
            .img-wrap{
                border-radius: 10px;
                overflow: hidden;
            }
            img{
                width: 100%;
                // object-fit: contain;
            }
            .delete{
                position: absolute;
                top: -14px;
                right: -14px;
                display: inline-block;
                width: 25px;
                height: 25px;
                i{
                    font-size: 25px;
                    cursor: pointer;
                    &:hover{
                        color: #000;
                    }
                }
            }
        }
    }
</style>