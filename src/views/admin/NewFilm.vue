<script setup>
import { reactive,ref } from 'vue';
import { DoAxiosWithErro } from '@/api';


const img = reactive(null)
const description = ref('');
const title = ref('')
const category = ref('');
const info = reactive({
    file:'',
    dy:'',
    bj:'',
    zy:'',
    lx:'',
    zp:'',
    yy:'',
    sy:'',
    pc:'',
    ym:'',

})

const handleChangeAvatar = (el) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.addEventListener('change', async (event) => {
        const file = event.target.files[0]; // 获取选择的文件
        info.file = file;
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            // 读取图片文件
            reader.readAsDataURL(file);

            reader.onload = (e) => {
                el.src = e.target.result;
            }
    }
});
    input.click(); // 触发文件选择
};

const sunmit = async () => {
    const formdata = new FormData();
    const movieinfo = `<p><strong>导演:</strong> ${info.dy}</p>
        <p><strong>编剧:</strong> ${info.bj}</p>
        <p><strong>主演:</strong> ${info.zy}</p>
        <p><strong>类型:</strong> ${info.lx}</p>
        <p><strong>制片国家/地区:</strong> ${info.zp}</p>
        <p><strong>语言:</strong> ${info.yy}</p>
        <p><strong>上映日期:</strong> ${info.sy}</p>
        <p><strong>片长:</strong> ${info.pc}</p>
        <p><strong>又名:</strong> ${info.ym}</p>`
    formdata.append('title',title.value);
    formdata.append('info',movieinfo);
    formdata.append('description',description.value);
    formdata.append('category',category.value);
    formdata.append('img',info.file);
    DoAxiosWithErro('/api/admin/add','post',formdata,true).then(()=>{
        console.log('ok')
    })
}

</script>

<template>
    <div class="newcontain">
        <div class="img">
            <img @click="handleChangeAvatar(img)" ref="img" style="width: 100px; height: 100px; object-fit: cover;" alt="上传图片">
        </div>
        <div class="name">
            电影名字：
            <el-input v-model="title" style="width: 200px;" placeholder="请输入电影名称"></el-input>
        </div>
        <div class="type">
            电影类型：
            <el-input v-model="category" style="width: 200px;" placeholder="请输入电影名称"></el-input>
        </div>
        <div class="inf">
            电影详情：
            导演:<el-input v-model="info.dy"></el-input>
            编剧:<el-input v-model="info.bj"></el-input>
            主演:<el-input v-model="info.zy"></el-input>
            类型:<el-input v-model="info.lx"></el-input>
            制片国家/地区:<el-input v-model="info.zp"></el-input>
            语言:<el-input v-model="info.yy"></el-input>
            上映日期:<el-input v-model="info.sy"></el-input>
            片长:<el-input v-model="info.pc"></el-input>
            又名:<el-input v-model="info.ym"></el-input>
        </div>
        <div class="scrpt">
            电影简介：
            <textarea v-model="description" class="text" placeholder="请输入电影简介"></textarea>
        </div>
        <el-button @click="sunmit">提交</el-button>
    </div>
</template>

<style lang="less" scoped>
.name{
    height: 50px;
}
.text{
            border: 1px solid #ccc;  /* 设置边框 */
            resize: none;  /* 禁用大小调整 */
            outline: none;  /* 移除激活时的边框（如聚焦时的蓝色边框） */
            padding: 10px;  /* 可以增加一些内边距，使文本不会紧贴边框 */
            font-size: 14px;  /* 可以根据需要设置字体大小 */
            width: 100%;
            height: 100px;
        }
</style>