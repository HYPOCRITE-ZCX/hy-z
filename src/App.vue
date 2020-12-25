<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>

export default {
  name: 'App',
  // provide(){
  //   return{
  //     reload: this.reload
  //   }
  // },
  // data(){
  //   return {
  //     isRouterAlive: true
  //   }
  // },
  // methods:{
  //   reload(){
  //     this.isRouterAlive=false
  //     this.$nextTick(function () {
  //       this.isRouterAlive=true
  //     })
  //   },
  // },
  mounted() {
    // let user = localStorage.getItem('userInfo');
    // if(user == null || user == undefined){
    //   this.$q.loading.hide()
    //   return
    // }
    // console.log("用户已登陆")
    // if(this.$ws.readyState !== this.$ws.OPEN){
    //   console.log("ws重新连接")
    //   this.$ws.init()
    // }
  }
}
</script>
