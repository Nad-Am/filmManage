<script setup>
import { defineProps } from 'vue';

const prorp = defineProps({
    detal:{
        type:Object,
    }
})

</script>

<template>
    <div class="cont">
        <img :src="prorp.detal.imageUrl" alt="movie image">
        <div class="name">{{ prorp.detal.title }}</div>
        <div
         class="star"
         :style="`background-position: 0 -${(10 - Math.round(prorp.detal.avgScore)) * 15}px;`"
        >{{ prorp.detal.avgScore }}</div>
    </div>
</template>

<style lang="less" scoped>
.cont{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    img{
        width: 100%;
        height: 280px;
        object-fit: cover;
    }
    .name{
        margin: 10px;
        width: 100px;
        white-space: nowrap;
        overflow: hidden; 
        text-overflow: ellipsis;
    }
    .star{
        width: 70%;
        height: 15px;
        color: rgb(236, 185, 19);
        padding: 0  0 0 50%;
        background: url(../assets/image/star.png) no-repeat;
        background-size: 70% 1100%;
    }
}
</style>