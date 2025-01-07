<script setup>
import MoveListCard from '@/components/MoveListCard.vue';
import { watch, onMounted, reactive, ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DoAxiosWithErro } from '@/api';


const route = useRoute();
const router = useRouter();
const value = ref('')
const isNull = ref(false);
const list = reactive([]);

const getlist = async () => {
    value.value = route.query.valus
    const repon = await DoAxiosWithErro('/api/movies/search','post',{
        fileName:value.value
    },true,true)
    if(Array.isArray(repon.data)) {
        list.splice(0,0,...repon.data);
        console.log('have')
        isNull.value = false
    } else {
        console.log('not have')
        isNull.value = true;
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

watch(route,(newvalu,oldvalu)=> {
    getlist()
})


onMounted(()=> {
    getlist()
})

</script>

<template>
    <div class="main">
        <div class="top">搜索：{{ value }}</div>
        <div @click="todetaile(item.id)" v-for="item in list" :key="item.id" class="item">
            <MoveListCard
             :title="item.title" 
             :avg-score="item.avgScore"
             :image-url="item.imageUrl"
            ></MoveListCard>
        </div>
        <el-empty v-if="isNull" description="没有找到哦" />
    </div>
</template>

<style lang="less" scoped>
.main{
    width: 1000px;
    height: 800px;
    margin: 0 auto;
    .top{
        margin: 10px 0;
    }
    .item{
        margin: 10px;
        width: 100%;
        height: 80px;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
}
</style>