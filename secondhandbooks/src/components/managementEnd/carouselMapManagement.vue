<template>
    <div class="carousel-map-management clearfix" v-if="loadSurvey">
        <div class="carousel" v-for="(carousel,index) in carouselsList" :key="index">
            <div class="img-wrap">
                <img :src="carousel.url" :alt="carousel.name" :title="carousel.name">
            </div>
            <span class="delete" @click="deleteCarousl(index)">
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
        <div class="btn">
            <el-button type="primary" @click="confirm">确定</el-button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            carouselsList: [],
            fileList: [],
            picList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            loadSurvey:true
        }
    },
    methods: {
        handleChange(file, fileList) {
            this.picList.push(file.raw)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        deleteCarousl(index) {
            this.$store.dispatch('carousel/deleteCarousel', this.carouselsList[index]._id)
            this.carouselsList.splice(index, 1);
        },
        async confirm() {
            if(this.picList) {
                let formData = new FormData()
                this.picList.forEach(pic => {
                    formData.append('carousel', pic)
                })
                const { picUrls } = await this.$store.dispatch('file/postCarousel', formData)
                // this.postAskingForm.pictures = picUrls
                // console.log(picUrls)
                this.$store.dispatch('carousel/addCarousels', picUrls).then(async res => {
                    // location.reload()
                    await this.$store.dispatch('carousel/getAllCarousel')
                    //使页面重新渲染
                    this.loadSurvey = false
                    this.$nextTick(() => {
                        this.loadSurvey = true
                    })
                })
            }
        }
    },
    watch: {
        allCarousels(newValue) {
            this.carouselsList = newValue;
        }
    },
    computed: {
        ...mapGetters([
            'allCarousels'
        ])
    },
    created() {
        this.$store.dispatch('carousel/getAllCarousel')
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
        .btn{
            margin-top: 20px;
        }
    }
</style>