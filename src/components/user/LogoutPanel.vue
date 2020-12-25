<template>
  <q-dialog v-model="show" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Logout</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        确认退出登录吗？
      </q-card-section>

      <q-card-actions class="bg-white text-teal">
        <q-btn flat label="CANCEL" @click="onClose" />
        <q-space />
        <q-btn flat label="YES" @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    inject: ['reload'],
    name: "LogoutPanel",
    props: {
      user: {
        type: Object,
        default: null
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onSubmit(){
        this.$store.commit('module/modify_login_status',false)
        this.reload()
        this.onClose()
      },
      onClose(){
        this.$emit('onClose')
      }
    }
  }
</script>

<style scoped>

</style>
