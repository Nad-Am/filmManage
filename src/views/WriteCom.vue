<script setup>
import MoveListCard from '@/components/MoveListCard.vue';
import { onMounted, ref } from 'vue';
import { DoAxiosWithErro } from '@/api';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage,ElMessageBox } from 'element-plus'

const route = useRoute();
const router = useRouter();
const commt = ref('')

const avgScore = ref(0);
const title = ref('');
const imageUrl = ref('')
const socer = ref(0)

const toCommit = async () => {
    if(!commt.value ){
        ElMessage({
            message:'评论不能为空',
            type:'warning'
        })
        return
    }
    DoAxiosWithErro('/api/comments/post','post',{
        filmId:Number(route.query.moveId),
        content:commt.value,
        score:socer.value.toFixed(1)
    },true,true).then(() =>{
        ElMessageBox.confirm(
            '评论成功，返回查看吗？？',
            '评论成功',
            {
                confirmButtonText:'好的',
                cancelButtonText:'不用',
                type:'success'
            }
        ).then(()=>{
            router.go(-1);
        })
    })

}

onMounted( async () => {
    const respon = await DoAxiosWithErro('/api//movies/getInfo','get',{
        id:Number(route.query.moveId)
    },true)
    avgScore.value = respon.data.avgScore;
    title.value = respon.data.title;
    imageUrl.value = respon.data.imageUrl;
})

</script>

<template>
    <div class="writeMain">
        <div class="top">写评论</div>
        <div class="card">
            <MoveListCard :imageUrl="imageUrl" :title="title" :avgScore="avgScore"></MoveListCard>
        </div>
        <div class="rating">
            给个评分吧:
            <div
             class="star"
             :style="`background-position: 0 -${(10 - Math.round(socer)) * 15}px;`"
            ></div>
            <el-input-number v-model="socer" max="10" min="0"></el-input-number>
        </div>
        <div class="write">
            <textarea v-model="commt" maxlength="80" placeholder="写评论" class="text"></textarea>
        </div>
        <el-button @click="toCommit">提交</el-button>
    </div>
</template>

<style lang="less" scoped>
.writeMain{
    width: 900px;
    height: 850px;
    margin: 0 auto;
    .top{
        margin: 10px 0;;
        color: rgb(82, 193, 245);
    }
    .card{
        height: 80px;
        background: #efeded;
    }
    .rating{
        margin: 10px 0;
        display: flex;
        font-size: 13px;
        .star{
            width: 80px;
            height: 15px;
            margin:0 10px ;
            background: url(../assets/image/star.png) no-repeat;
            background-size: 100% 1110%;
        }
    }
    .write{
        margin: 20px 0;
        .text{
            border: 1px solid #ccc;  /* 设置边框 */
            resize: none;  /* 禁用大小调整 */
            outline: none;  /* 移除激活时的边框（如聚焦时的蓝色边框） */
            padding: 10px;  /* 可以增加一些内边距，使文本不会紧贴边框 */
            font-size: 14px;  /* 可以根据需要设置字体大小 */
            width: 100%;
            height: 500px;
        }
    }
}
</style>