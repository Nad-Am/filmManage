<script setup>
import { defineProps } from 'vue';

const props = defineProps(['imageUrl','title','avgScore'])

</script>
<template>
    <div class="contain">
        <img class="img" :src="props.imageUrl" alt="">
        <div class="descrip">
            <div class="name">{{ props.title }}</div>
            <div class="info">呼呼评分&nbsp;&nbsp;&nbsp;{{ props.avgScore }}</div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.contain{
    width: 100%;
    height: 100%;
    display: flex;
    .img{
        padding: 5px;
        height: 100%;
        width: 80px;
        object-fit: cover;
    }
    .descrip{
        margin: 5px;
        .name{
            margin: 5px;
            font-size: 15px;
            color: rgb(47, 167, 242);
            font-weight: bold;
        }
        .info{
            margin: 10px 5px 5px 5px;
            font-size: 13px;
            color: #576971;
        }
    }
}
</style>