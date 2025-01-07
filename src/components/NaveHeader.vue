<script setup>
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user'

const router = useRouter();
const value = ref('')
const userStor = useUserStore();

const toSearch = ()=> {
    if(!value.value){
        ElMessage({
            message:'搜索不能为空',
            type:'warning'
        })
        return
    }
    router.push({
        name:'search',
        query:{
            valus:value.value
        }
    })
    value.value = '';
}

const toAdmin = () => {
    router.push({
        path:'/admin'
    })
}

onMounted(()=>{
    console.log(userStor.userInfo.username)
})
</script>

<template>
  <div class="contain">
    <div class="icon">呼呼评分</div>
    <el-input 
     style="width: 500px;height: 55px; padding: 10px;"
     placeholder="搜索影片"
     v-model="value"
     >
        <template #append>
            <el-button @click="toSearch" :icon="Search"></el-button>
        </template>
    </el-input>
    <div class="user">
        <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span style="font-size: small; padding: 10px 2px 2px 2px;">{{ userStor.userInfo.username }}</span>
    </div>
    <el-button v-if="userStor.userInfo.role == 1" @click="toAdmin">管理</el-button>
  </div>
</template>


<style lang="less" scoped>
@import '../assets/var.less';
.contain{
    display: flex;
    padding: 0 180px;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    background: @fromBg;
    .icon{
        color: rgb(42,144,206);
        font-size: 30px;
        font-weight: bolder;
        text-shadow: 2px 2px 2px rgb(176, 210, 231);
    }
    .user{
        height: 100%;
        display: flex;
        align-items: center;
    }
}
</style>