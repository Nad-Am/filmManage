<script setup>
import { defineProps } from 'vue';

const prop = defineProps({
    detal:{
        type:Object,
    }
})

</script>

<template>
    <div class="list">
        <div class="top">
            <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <div style="margin: 5px;">{{ prop.detal.username }}</div>
            <div 
             class="star"
             :style="`background-position: 0 -${(10 - Math.round(prop.detal.score)) * 20}px;`"
            ></div>
            <div style="margin: 5px;">{{ prop.detal.createTime }}</div>
        </div>
        <div class="value">
            &nbsp;&nbsp;&nbsp;{{ prop.detal.content }}
        </div>
    </div>
</template>

<style lang="less" scoped>
.list{
    width: 100%;
    height: 100%;
    .top{
        margin: 10px 0;
        position: relative;
        display: flex;
        .star{
            margin: 5px;
            width: 90px;
            height: 20px;
            background: url(../assets/image/star.png) no-repeat;
            background-size: 100% 1100%;
            background-position: 0 -20px;
        }
    }
}
</style>