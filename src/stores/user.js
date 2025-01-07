import { defineStore } from "pinia";
import { DoAxiosWithErro } from "@/api";
export const useUserStore =  defineStore('user',{
    state:() => ({
        userInfo:JSON.parse(localStorage.getItem('useInfo')) || {},
        userToken: localStorage.getItem('userToken') || '',
        isLoggedIn:false
    }),
    getters: {
        isAuthenticated: (state) => !!state.userInfo,
        userName: (state) => (state.userInfo ? state.userInfo.username : 'Guest')
      },
    
      // 3. 定义 actions
      actions: {
        async login(userData) {
              const Info = {};
              const data = await DoAxiosWithErro('/api/users/login','post',userData,false);
              this.userToken = data.data.saTokenInfo.tokenValue;

              Info.username = data.data.username;
              Info.role = data.data.role;
              localStorage.setItem('userToken', this.userToken);
              this.userInfo = Info;
              const infoJSON = JSON.stringify(Info);
              localStorage.setItem('useInfo',infoJSON);
              // console.log(infoJSON,'and',localStorage.getItem('useInfo'));
        },
        async logout() {
          this.userInfo = null;
          await DoAxiosWithErro('/api/users/logout','post',{},true);
          localStorage.removeItem('userToken');
          localStorage.removeItem('useInfo');
          this.isLoggedIn = false;
        }
      }
})