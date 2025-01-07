<script setup>

import { defineProps } from 'vue';

const props = defineProps({
    info:{
        type:Object
    }
})

</script>

<template>
    <div class="usecarmain">
        <div class="user">
            <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <span style="font-size: small; padding: 10px 2px 2px 2px;">{{ props.info.username }}</span>
        </div>
        <div class="time">{{ props.info.applicationTime }}</div>
    </div>
</template>

<style lang="less" scoped>
.usecarmain{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    // justify-content: space-between;
    .user{
        margin: 10px;
        width: 150px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .time{
        position: absolute;
        right: 400px;
    }
}
</style>