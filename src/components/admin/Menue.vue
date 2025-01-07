<script setup>

</script>

<template>
    <div class="mainone">
        <el-menu style="height: 600px;" router :default-active="'userlist'">
            <!-- 审核列表菜单项 -->
            <el-menu-item :index="'userlist'" :route="{ path: '/admin' }">
                <el-icon><Operation /></el-icon>
                审核列表
            </el-menu-item>

            <!-- 影片管理菜单项 -->
            <el-menu-item :index="'filmlist'" :route="{ path: '/admin/filmlist' }">
                <el-icon><DataAnalysis /></el-icon>
                影片管理
            </el-menu-item>
            <!-- 用户日志菜单项 -->
            <el-menu-item :index="'userlog'" :route="{ path: '/admin/userlog' }">
                <el-icon><Reading /></el-icon>
                用户日志
            </el-menu-item>
        </el-menu>
    </div>
</template>


<style lang="less" scoped>
.mainone{
    width: 100%;
    height: 100px;
}
</style>