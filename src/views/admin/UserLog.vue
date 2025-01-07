<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { Search } from '@element-plus/icons-vue'
import LogCard from '@/components/admin/LogCard.vue';
import { DoAxiosWithErro } from '@/api';

const value = ref('');
const name = ref('')
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
    const respon = await DoAxiosWithErro('/api/admin/logs','post',{
        pageNo:pageNo.value,
        pageSize,
        sortBy:'',
        isAsc:true,
        username:name.value,
        logLevel:0
    },true)
    isfetching.value = false;
    loglist.push(...respon.data.list)
  }
}

const tosearch = () => {
    name.value = value.value
}

const delelog = (logId) => {
    DoAxiosWithErro('/api/admin/logDelete','post',{
        logId
    },true,true).then(()=>{
        const index = loglist.findIndex(i => i.id === logId);
        loglist.splice(index,1);
    })
}

watch(name,async ()=>{
    const respon = await DoAxiosWithErro('/api/admin/logs','post',{
        pageNo:pageNo.value,
        pageSize,
        sortBy:'',
        isAsc:true,
        username:name.value,
        logLevel:0
    },true)
    loglist.splice(0,loglist.length,...respon.data.list)
})

onMounted(async () => {
    const respon = await DoAxiosWithErro('/api/admin/logs','post',{
        pageNo:pageNo.value,
        pageSize,
        sortBy:'',
        isAsc:true,
        username:'',
        logLevel:0
    },true)
    loglist.splice(0,0,...respon.data.list)
    console.log(loglist);
})

</script>

<template>
    <div ref="scoll" @scroll="handleMore" class="logmain">
        <el-input v-model="value" style="width: 400px;">
            <template #append>
                <el-button :icon="Search" @click="tosearch"></el-button>
            </template>
        </el-input>
        <h4 style="margin: 10px;" v-if="!name">全部</h4>
        <h4 style="margin: 10px;" v-else>{{ name }}的日志</h4>
        <div class="content">
            <div v-for="item in loglist" :key="item.id" class="iterm">
                <LogCard :info="item"></LogCard>
                <el-button class="logbuton" @click="delelog(item.id)">删除日志</el-button>
            </div>
        </div>
        <div class="loding" v-loading="isfetching"></div>
        <el-empty v-if="loglist.length == 0" description="还没有任何日志哦" />
    </div>
</template>

<style lang="less" scoped>
.logmain{
    height: 100%;
    // height: 100%;
    // background: #000;
    overflow: auto;
    // border: 10px solid yellow;
    // scrollbar-width: none;
    .iterm{
        width: 100%;
        height: 100px;
        position: relative;
        .logbuton{
            position: absolute;
            right: 50px;
            top: 20%;
        }
    }
}
.loding{
    width: 1005;
    height: 30px;
}
</style>