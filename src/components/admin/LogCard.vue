<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    info:{
        type:Object,
    }
})

</script>

<template>
    <div class="logcard">
        <div class="user">
            <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <span style="font-size: small; padding: 10px 2px 2px 2px;">{{ info.username }}</span>
        </div>
        <div class="op">{{ info.action }}</div>
    </div>
</template>

<style lang="less" scoped>
.logcard{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user{
        margin: 10px;
        width: 100px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .op{
        flex: 0.5;
    }
}
</style>