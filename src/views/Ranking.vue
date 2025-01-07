<script setup>
import { useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import MoveCard from '@/components/MoveCard.vue';
import { DoAxiosWithErro } from '@/api';
import { onMounted, reactive, ref } from 'vue';

const router = useRouter();

const Aclists = reactive([])
const Actotal = ref(0);

const todetaile = (id)=> {
    router.push({
        name:'detaile',
        query:{
            movieId:id
        }
    })
}

onMounted(async ()=>{
    const info =  await DoAxiosWithErro('/api/movies/list','post',{
        type:'Action',
        pageNo:1,
        pageSize:5,
        sortBy:'',
        isAsc:null
    },true)
    Aclists.splice(0,0,...info.data.list);
    Actotal.value = info.data.total;
})

</script>

<template>
    <div class="contain">
        <div class="iterm">
            <div class="titile">动作电影</div>
            <div class="content">
                <div @click="todetaile(item.id)" v-for="item in Aclists" :key="item.id" class="move">
                    <MoveCard :detal="item"></MoveCard>
                </div>
            </div>
            <div class="footer">
                <el-button type="primary" :icon="ArrowLeft" circle></el-button>
                <el-button type="primary" :icon="ArrowRight" circle></el-button>
            </div>
        </div>
        <div class="iterm">
            <div class="titile">动画电影</div>
            <div class="content">
                <div @click="todetaile(item.id)" v-for="item in Aclists" :key="item.id" class="move">
                    <MoveCard :detal="item"></MoveCard>
                </div>
            </div>
            <div class="footer">
                <el-button type="primary" :icon="ArrowLeft" circle></el-button>
                <el-button type="primary" :icon="ArrowRight" circle></el-button>
            </div>
        </div>
        <div class="iterm">
            <div class="titile">纪录片</div>
            <div class="content">
                <div @click="todetaile(item.id)" v-for="item in Aclists" :key="item.id" class="move">
                    <MoveCard :detal="item"></MoveCard>
                </div>
            </div>
            <div class="footer">
                <el-button type="primary" :icon="ArrowLeft" circle></el-button>
                <el-button type="primary" :icon="ArrowRight" circle></el-button>
            </div>
        </div>
        <div class="iterm">
            <div class="titile">网络</div>
            <div class="content">
                <div @click="todetaile(item.id)" v-for="item in Aclists" :key="item.id" class="move">
                    <MoveCard :detal="item"></MoveCard>
                </div>
            </div>
            <div class="footer">
                <el-button type="primary" :icon="ArrowLeft" circle></el-button>
                <el-button type="primary" :icon="ArrowRight" circle></el-button>
            </div>
        </div>
    </div>
</template>


<style lang="less" scoped>
@import '../assets/var.less';
.contain{
    width: 1200px;
    margin: 0 auto;
    .iterm{
        margin: 10px;
        .titile{
            padding: 10px;
            border-bottom: 2px solid @fromBg;
        }
        .content{
            display: flex;
            // justify-content: space-around;
            margin: 20px;
            height: 400px;
            .move{
                width: 200px;
                margin: 10px;
            }
        }
        .footer{
            width: 100px;
            margin: 0 auto;
        }
    }
}
</style>