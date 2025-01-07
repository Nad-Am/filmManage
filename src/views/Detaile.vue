<script setup>
import CommentList from '@/components/CommentList.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { DoAxiosWithErro } from '@/api';
import  { useUserStore } from '@/stores/user'

const router = useRouter();
const route = useRoute();
const UserStor = useUserStore();
const imageUrl = ref('')
const title = ref('')
const description = ref('')
const avgScore = ref(0)
const infom = ref('')
const commlist = reactive([])

const id = route.query.movieId

const toWrite = () => {
  router.push({
    name:'write',
    query:{
      moveId:id
    }
  })
}

const deletCom = (id)=> {
  DoAxiosWithErro('/api/comments/delete','post',{
    commentId:id
  },true,true).then(()=>{
    const result = commlist.filter((i) => i.id !== id);
    commlist.splice(0,commlist.length,...result);
  })

}

onMounted( async () => {
  console.log(UserStor.userName)
  const info = await DoAxiosWithErro('/api/movies/getInfo','get',{
    id
  },true)
  imageUrl.value = info.data.imageUrl;
  title.value = info.data.titile
  description.value = info.data.description
  avgScore.value = info.data.avgScore
  infom.value = info.data.info
  const list = await DoAxiosWithErro('/api/comments/list','post',{
    pageNo:1,
    pageSize:10,
    filmId: Number(id),
    sortBy:'',
    isAsc: true
  },true)
  commlist.splice(0,0,...list.data.list);
  console.log(commlist)
})

</script>

<template>
  <div class="about">
    <h1 
    style="margin: 10px ; border-bottom: 1px solid rgb(238, 238, 236);"
    >
      这个杀手不好惹
    </h1>
    <div class="content">
      <img style="width: 250px; height: 400px; object-fit: cover;" :src="imageUrl" alt="">
      <div v-html="infom" class="" style="width: 300px;"></div>
      <div class="star">
        <div class="titile">呼呼评分</div>
        <div class="socermain">
          <div class="socer">{{ avgScore }}</div>
          <div
           class="starBg"
           :style="`background-position: 0 -${(10 - Math.round(avgScore)) * 20}px;`"
           ></div>
          <div class="peop">
            1223人评论过
          </div>
        </div>
      </div>
      <div class="writeComm">
        <h6 style="padding: 0; margin: 0;">我要评分</h6>
        <span 
        @click="toWrite"
        style="color: rgb(42,144,206); margin: 5px; font-size: 12px; text-decoration: underline; cursor: pointer;"
        >
          去写影评
        </span>
      </div>
    </div>
    <div class="descrip">
      <div class="descTitle">这个杀手不冷静的简介....</div>
      <div class="descContent">
        &nbsp;&nbsp;&nbsp;{{ description }}
      </div>
    </div>
    <div class="comment">
      <div class="commentTitle">这个杀手不冷静的影评....</div>
      <div class="commentConten">
        <div v-for="(item,index) in commlist" :key="item.id" class="item">
          <CommentList :detal="item"></CommentList>
          <el-button 
            v-if="(index === 0 && item.username == UserStor.userInfo.username) || UserStor.userInfo.role " 
            @click="deletCom(item.id)"
            style="position: absolute; top: 10px; right: 20px;"
          >
            删除
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.about{
  width: 900px;
  height: auto;
  // background: #dacece;
  margin: 20px auto 0 auto;
  .content{
    position: relative;
    display: flex;
    margin: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
    .star{
      border-left: 1px solid rgb(238, 238, 236);
      width: 250px;
      .titile{
          margin: 0 10px;
          color: rgb(136, 142, 146);
          font-size: 18px;
          font-weight: bold;
        }
      .socermain{
        display: flex;
        margin: 10px;
        position: relative;
        .socer{
          width: 45px;
          height: 50px;
          font-size: 30px;
          line-height: 50px;
          text-align: center;
        }
        .starBg{
          width: 90px;
          height: 20px;
          background: url(../assets/image/star.png) no-repeat;
          background-size: 100% 1100%;
          // background-position: 0 -20px;
        }
        .peop{
          position: absolute;
          font-size: 12px;
          color: rgb(136, 142, 146);
          bottom: 0;
          right: 50px;
        }
      }
    }
    .writeComm{
      margin: 10px 0;
      width: 100px;
    }
  }
  .descrip{
    margin: 10px;
    .descTitle{
      margin: 5px;
      font-size: 18px;
      font-weight: bold;
      color: rgb(82, 193, 245);
    }
  }
  .comment{
    margin: 20px 10px;
    .commentTitle{
      margin: 5px;
      font-size: 18px;
      font-weight: bold;
      color: rgb(82, 193, 245);
    }
    .item{
      position: relative;
      margin: 20px 0;
      width: 100%;
      height: 120px;
      border-bottom: 1px solid rgb(238, 238, 236);;
      // background: red ;
    }
  }
}
</style>