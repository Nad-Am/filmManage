<script setup>
import { useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import MoveCard from '@/components/MoveCard.vue';
import { DoAxiosWithErro } from '@/api';
import { onMounted, reactive, ref } from 'vue';

const router = useRouter();
const rank = reactive([
    {
        type:'动作电影',
        fetype:'Action',
        list:[],
        pageNo:1,
        total:0
    },
    {
        type:'浪漫电影',
        fetype:'Romance',
        list:[],
        pageNo:1,
        total:0
    },
    {
        type:'喜剧电影',
        fetype:'Comedy',
        list:[],
        pageNo:1,
        total:0
    },
    {
        type:'动漫电影',
        fetype:'Anime',
        list:[],
        pageNo:1,
        total:0
    },
])

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

const tocheckpage = async (index,op) => {
    console.log('ok')
    if(op == 0 && rank[index].pageNo > 1){
        rank[index].pageNo --;
        const info =  await DoAxiosWithErro('/api/movies/list','post',{
            type:rank[index].fetype,
            pageNo:rank[index].pageNo,
            pageSize:5,
            sortBy:'',
            isAsc:null
        },true)
        rank[index].list.splice(0,5,...info.data.list);
        return
    }
    if(op == 1 && rank[index].pageNo * 5 < rank[index].total){
        rank[index].pageNo ++;
        const info =  await DoAxiosWithErro('/api/movies/list','post',{
            type:rank[index].fetype,
            pageNo:rank[index].pageNo,
            pageSize:5,
            sortBy:'',
            isAsc:null
        },true)
        rank[index].list.splice(0,5,...info.data.list);
        return
    }
}

onMounted(async ()=>{
    let index = 0;
    for( let i of rank){
        const info =  await DoAxiosWithErro('/api/movies/list','post',{
            type:i.fetype,
            pageNo:1,
            pageSize:5,
            sortBy:'',
            isAsc:null
        },true)
        // Aclists.splice(0,0,...info.data.list);
        rank[index].list.splice(0,0,...info.data.list);
        rank[index].total = info.data.total;
        index ++;
    }
})

</script>

<template>
    <div class="contain">
        <div v-for="(item,index) in rank" :key="index" class="iterm">
            <div class="titile">{{ item.type }}</div>
            <div class="content">
                <div @click="todetaile(item.id)" v-for="item in item.list" :key="item.id" class="move">
                    <MoveCard :detal="item"></MoveCard>
                </div>
                <el-empty v-if="item.total == 0" description="还没有该类型影片哦"></el-empty>
            </div>
            <div class="footer">
                <el-button type="primary" @click="tocheckpage(index,0)" :icon="ArrowLeft" circle></el-button>
                <el-button type="primary" @click="tocheckpage(index,1)" :icon="ArrowRight" circle></el-button>
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