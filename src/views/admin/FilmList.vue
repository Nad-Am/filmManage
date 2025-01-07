<script setup>
import MoveListCard from '@/components/MoveListCard.vue';
import { onMounted, reactive, ref } from 'vue';
import { DoAxiosWithErro } from '@/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const movielist = reactive([]);
const scoll = ref(null);
const loglist = reactive([]);
const isfetching = ref(false);
const pageNo = ref(1)
const pageSize = 20

const handleMore = async () => {
  if (!scoll.value || isfetching.value) return;
  const scrollTop = scoll.value.scrollTop; // 当前滚动位置
  const scrollHeight = scoll.value.scrollHeight; // 滚动区域总高度
  const clientHeight = scoll.value.clientHeight; // 可视区域高度
  // 判断是否接近底部，触发加载更多
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    isfetching.value = true
    pageNo.value ++;
    const respon =  await DoAxiosWithErro('/api/movies/list','post',{
        type:'',
        pageNo:pageNo.value,
        pageSize,
        sortBy:'',
        isAsc:null
    },true)
    isfetching.value = false;
    loglist.push(...respon.data.list)
  }
}

const todetaile = (id)=> {
    router.push({
        name:'detaile',
        query:{
            movieId:id
        }
    })
}

const tonewfilm = () => {
    router.push({
        name:'newfilm'
    })
}

const deletMovie = (id) => {
    DoAxiosWithErro('/api/admin/delete','post',{
        filmId:id
    },true,true).then(()=>{
        const result = movielist.filter(i => i.id !== id);
        movielist.splice(0,movielist.length,...result);
    })
}

onMounted(async ()=>{
    const info =  await DoAxiosWithErro('/api/movies/list','post',{
        type:'',
        pageNo:1,
        pageSize,
        sortBy:'',
        isAsc:null
    },true)
    movielist.splice(0,0,...info.data.list);
    console.log(movielist);
})

</script>

<template>
    <div ref="scoll" @scroll="handleMore" class="filmList">
        <div class="newMove">
            <el-button @click="tonewfilm">新增影片</el-button>
        </div>
        <div v-for="item in movielist" :key="item.id" class="iterm">
            <MoveListCard
             :avg-score="item.avgScore"
             :image-url="item.imageUrl"
             :title="item.title"
            ></MoveListCard>
            <div class="button">
                <el-button @click="todetaile(item.id)">查看</el-button>
                <el-button @click="deletMovie(item.id)">删除</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.filmList{
    height: 100%;
    overflow: auto;
    scrollbar-width: none;
    .iterm{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        width: 90%;
        height: 100px;
        border-radius: 10px;
        border: 2px solid rgb(218, 215, 215);
        margin: 10px;
        .button{
            width: 200px;
        }
    }
}
</style>