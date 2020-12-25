<template>
  <q-dialog v-model="show" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-white text-teal q-pa-md" style="width: 400px">
      <q-form @submit="onSubmit"
              class="q-gutter-md">
        <q-input filled
                 v-model="userLoginInfo.email"
                 label="Your email *"
                 lazy-rules
                 :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input filled
                 v-model="userLoginInfo.password"
                 label="Your password *"
                 lazy-rules
                 @keypress.enter="onSubmit"
                 :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
      </q-form>

      <q-card-actions class="bg-white text-teal">
        <q-btn flat
               label="Cancel"
               @click="onClose"
        />
        <q-space />
        <q-btn :loading="loading"
               label="Login"
               type="submit"
               color="primary"
               @click="onSubmit"
        />
      </q-card-actions>

      <q-card-actions class="bg-white text-grey" align="center">
        <label class="q-mr-xs cursor-pointer"
               @click="registerPersistent = true">
          register
        </label>
        <q-separator vertical />
        <label class="q-ml-xs cursor-pointer">
          forget
        </label>
      </q-card-actions>

    </q-card>

    <register-panel @onClose="registerClose"
                    :show="registerPersistent">
    </register-panel>

  </q-dialog>
</template>

<script>
  import globalVar from "src/store/globalvar";
  import RegisterPanel from "components/user/RegisterPanel";
  import { mapState } from 'vuex'
  export default {
    components: {RegisterPanel},
    inject: ['reload'],
    name: "LoginPanel",
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        loading: false,
        registerPersistent: false,
        userLoginInfo: {
          email: '',
          password: '',
        }
      }
    },
    computed: {
      getIsLogin(){
        return this.$store.state.module.isLogin
      }
    },
    watch: {
      getIsLogin(val){
        console.log("收到的值为"+val)
        this.isLogin = val
      }
    },
    methods: {
      onSubmit(){
        // this.$emit('onSubmit',this.user)
        this.loading = true
        this.$axios.post("/center/login",this.userLoginInfo,)
            .then( (response) => {
              const data = response.data.result

              if(data.status == 200){
                let item = localStorage.getItem('userInfo');
                if(item!=null){
                  console.log("用户已登录")
                }
                localStorage.setItem('userInfo',JSON.stringify(data.user));
                this.loading = false
                this.onClose()
                // this.$store.state.module.isLogin = true
                this.$store.commit('module/modify_login_status',true)
                this.$notify.successNotify(data.msg)
                // this.reload()
                this.$ws.init()
                let dataPacket = {
                  protocol: globalVar.protocol.GLOBAL_LISTEN_INFO,
                  packet: {
                    senderId: data.user.id
                  }
                }
                this.$ws.send(JSON.stringify(dataPacket),(e)=>{
                  if(e.status == 200){
                    if(e.sub_protocol === globalVar.protocol.CHAT_NOTIFY){
                      this.$notify.chatNotify(e.chatPacket)
                    }else {
                      this.$notify.successNotify(e.msg)
                    }
                    if(e.sub_protocol === globalVar.protocol.ADD_REQUEST_NOTIFY){
                      this.$notify.serverNotify(e.requestPacket)
                    }
                  }else {
                    this.$notify.errorNotify(e.msg)
                  }
                })
              }else {
                this.loading = false
                this.$notify.errorNotify(data.msg)
              }
            })
      },
      onClose(){
        this.loading = false
        this.$emit('onClose')
      },
      registerClose(){
        this.registerPersistent = false
      },
    }
  }
</script>

<style scoped>

</style>
