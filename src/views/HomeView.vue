<script setup>
import NaveHeader from '@/components/NaveHeader.vue';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
// import { DoAxiosWithErro } from '@/api';

// onMounted(async ()=>{
//     const info =  await DoAxiosWithErro('/api/movies/list','post',{
//         type:'Action',
//         pageNo:1,
//         pageSize:5,
//         sortBy:'',
//         isAsc:null
//     },true)
//     console.log(info);
// })


</script>

<template>
    <div class="home">
        <el-container>
            <el-header style="padding: 0;min-width: 110px;">
                <NaveHeader></NaveHeader>
            </el-header>
            <el-main style="padding: 0;width: 100%;">
                <router-view></router-view>
            </el-main>
            <el-footer class="footer">
            3317015696@qq.com
            </el-footer>
    </el-container>
    </div>
</template>
<style scoped>
.home{
    width: 99vw;
    min-width: 1100px;
    margin: 0;
    padding: 0;
    /* background: rgba(0,0,0,0.1); */
    scrollbar-width: none;
}
.footer{
    border: 2px dashed rgba(234, 232, 230, 0.5);
    height: 30px;
    color: rgb(156, 159, 161);
    line-height: 30px;
    text-align: center;
}
</style>


