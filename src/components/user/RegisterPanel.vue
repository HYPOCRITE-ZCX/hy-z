<template>
  <q-dialog v-model="show" persistent transition-show="scale"  transition-hide="scale">
    <q-card style="width: 400px" class="q-pa-md">
      <q-form
        @submit="onSubmit"
        class="q-gutter-md">
        <q-input filled
                 v-model="userRegisterInfo.email"
                 label="Your email *"
                 lazy-rules
                 :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input outlined bottom-slots
                 v-model="userRegisterInfo.verificationCode"
                 :rules="[ val => val && val.length > 0 || 'Please type something']"
                 label="验证码"
                 counter
                 maxlength="12">
          <template v-slot:hint>
            输入验证码
          </template>
          <template v-slot:after>
            <q-btn :loading="codeLoading" dense flat label="发送验证码" @click="sendCode" />
          </template>
        </q-input>

        <q-input filled
                 v-model="userRegisterInfo.password"
                 label="Your password *"
                 lazy-rules
                 :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input filled
                 v-model="userRegisterInfo.username"
                 label="Your username *"
                 lazy-rules
                 :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-toggle v-model="accept" label="确认填写的信息" />

      </q-form>

      <q-card-actions class="bg-white text-teal">
        <q-btn flat label="Cancel" @click="onClose" />
        <q-space />
        <q-btn :loading="submitLoading" label="Submit" type="submit" color="primary" @click="onSubmit" />
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "RegisterPanel",
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        accept: false,
        codeLoading: false,
        submitLoading: false,
        userRegisterInfo: {
          email: '',
          verificationCode: '',
          password: '',
          username: ''
        }
      }
    },
    methods: {
      sendCode(){
        this.codeLoading = true
        if(  this.userRegisterInfo.email.trim() == '' ||
             this.userRegisterInfo.email == '' ||
             this.userRegisterInfo.email == null){
          return
        }
        this.$axios.post("/center/send-code",this.userRegisterInfo)
            .then( (response) =>{
              const data = response.data.result
              if(data.status == 200){
                this.codeLoading = false
                this.$notify.successNotify(data.msg)
              }else {
                this.codeLoading = false
                this.$notify.errorNotify(data.msg)
              }
        })
      },
      onSubmit(){
        if (this.accept == false){
          return
        }
        // this.$emit('onSubmit',this.user)
        this.$axios.post("/center/register",this.userRegisterInfo)
            .then( (response) =>{
              const data = response.data.result
              if(data.status == 200){
                this.submitLoading = false
                this.$notify.successNotify(data.msg)
              }else {
                this.submitLoading = false
                this.$notify.errorNotify(data.msg)
              }
        })

      },
      onClose(){
        this.$emit('onClose')
      }
    }
  }
</script>

<style scoped>

</style>
