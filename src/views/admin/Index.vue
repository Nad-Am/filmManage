<script setup>
import Menue from '@/components/admin/Menue.vue';
</script>

<template>
    <div class="contain">
        <el-container>
            <el-header class="head">
                <div class="icon">呼呼评分</div>
                <div class="user">
                    <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                    <span style="font-size: small; padding: 10px 2px 2px 2px;">Nad Am</span>
                </div>
            </el-header>
            <el-main class="main">
                <el-container>
                    <el-aside class="aside">
                        <Menue></Menue>
                    </el-aside>
                    <el-main class="inMain">
                        <RouterView></RouterView>
                    </el-main>
                </el-container>
            </el-main>
            <el-footer class="footer">
            3317015696@qq.com
            </el-footer>
        </el-container>
    </div>
</template>

<style lang="less" scoped>
@import '@/assets/var.less';
.contain{
    width: 100vw;
    height: 100vh;
    overflow: auto;
    scrollbar-width: none;
    .head{
        height: 6vh;
        margin: 0;
        display: flex;
        justify-content: space-around;
        padding: 10px 300px;
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
    .main{
        height: 90vh;
        margin: 0;
        .aside{
            height: 600px;
            width: 200px;
        }
        .inMain{
            height: 700px;
            // background: #000;
        }
    }
    .footer{
        border: 2px dashed rgba(234, 232, 230, 0.5);
        height: 3vh;
        color: rgb(156, 159, 161);
        line-height: 30px;
        text-align: center;
        margin: 0;
    }
}
</style>