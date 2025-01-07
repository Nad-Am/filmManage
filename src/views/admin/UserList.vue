<script setup>
import UserCard from '@/components/admin/UserCard.vue';
import { onMounted, reactive } from 'vue';
import { DoAxiosWithErro } from '@/api';

const userlist = reactive([]);

const agree = (userId,status) => {
    DoAxiosWithErro('/api/admin/review','post',{
        userId,
        status
    },true,true).then(()=>{
        const index = userlist.findIndex(i => i.id === userId)
        userlist.splice(index,1);
    })
}

onMounted(async () => {
    const repon = await DoAxiosWithErro('/api/admin/reviewList','get',{},true);
    userlist.splice(0,0,...repon.data);

})

</script>

<template>
    <div class="listmain">
        <div v-for="item in userlist" :key="item.id" class="item">
            <UserCard :info="item"></UserCard>
            <div class="button">
                <el-button @click="agree(item.id,1)">同意</el-button>
                <el-button @click="agree(item.id,2)">拒绝</el-button>
            </div>
        </div>
        <el-empty v-if="userlist.length == 0" description="还没有申请请求哦" />
    </div>
</template>

<style lang="less" scoped>
.listmain{
    height: 100%;
    overflow: auto;
    scrollbar-width: none;
    .item{
        width: 90%;
        height: 100px;
        border-radius: 10px;
        border: 2px solid rgb(218, 215, 215);
        margin: 10px;
        position: relative;
        .button{
            position: absolute;
            right: 20px;
            top: 30%;
        }
    }
}
</style>