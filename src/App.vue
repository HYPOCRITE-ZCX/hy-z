<template>
  <div id="q-app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  name: 'App',
  provide(){
    return{
      reload: this.reload
    }
  },
  data: () => ({
    isRouterAlive: true
  }),
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function () {
        this.isRouterAlive=true
      })
    },
  }
}
</script>
