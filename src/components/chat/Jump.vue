<template>

</template>

<script>
  export default {
    name: "Jump",
    mounted() {
      this.$router.push({
        path: '/chat/chat-box',
        query: {
          user: this.$route.query.user
        }
      })
    }
  }
</script>

<style scoped>

</style>
