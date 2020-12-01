<template>

    <div class="row justify-center">
      <q-scroll-area class="q-pa-md" style="width: 100%;height: 400px;">
        <div style="width: 100%;">
          <q-chat-message
            label="Sunday, 19th"
          />

<!--          <div v-for="(m,index) in messageLog">-->
            <q-chat-message
              v-for="(m,index) in msgLog"
              :key="m+index"
              :sent="m.isSender"
              size="4"
              :name="m.remark"
              :avatar="m.avatar"
              :text="[m.msg]"
              :stamp="m.date"
            />
<!--          </div>-->

        </div>
      </q-scroll-area>

      <q-separator />

      <div class="q-pa-md" style="width: 100%;height: 200px">
        <q-input
          label="ctrl+enter发送消息"
          v-model="chatPacket.msg"
          clear-icon="close"
          @keydown.ctrl.enter="sendTextMsg(chatPacket)"
          filled
          type="textarea"
        />
      </div>
    </div>

</template>

<script>
  import globalVar from "src/store/globalvar";

  // {
  //   isSender: true,
  //     username: 'zcx',
  //   remark: 'zcx',
  //   avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
  //   msg: 'hey, how are you?',
  //   date: '',
  //   length: 0
  // },
  // {
  //   isSender: false,
  //     username: 'zh',
  //   remark: 'zh',
  //   avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
  //   msg: '你好你好你好你好你好你好你好你好你好你好你好你好你好',
  //   date: '',
  //   length: 0
  // },
  // {
  //   isSender: false,
  //     username: 'zh',
  //   remark: 'zh',
  //   avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
  //   msg: 'doing fine, how r you?',
  //   date: '',
  //   length: 0
  // }

  export default {
    name: "MessageBox",
    data(){
      return {
        // textMsg: '',
        // targetUser: {
        //   id: '111',
        //   username: 'xxx',
        //   email: 'wstapforth5@pcworld.com',
        //   avatar: 'avatar2.jpg',
        //   remark: '1号朋友'
        // },
        chatPacket: {
          isSender: true,
          senderId: '111',
          avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
          receiverId: '222',
          username: 'zh',
          remark: 'zh',
          msg: 'xxx',
          date: '2020-12-06'
        },
        msgLog: [

        ]
      }
    },
    methods:{
      sendTextMsg(chatPacket){
        chatPacket = JSON.parse(JSON.stringify(chatPacket))
        if(chatPacket === null || chatPacket==undefined){
          return
        }
        let msg = chatPacket.msg
        if(msg==undefined || msg=='' || msg.trim()==''){
          return
        }else {
          this.msgLog.push(chatPacket)
        }
        let dataPacket={
          protocol: globalVar.protocol.CHAT,
          packet: this.chatPacket
        }
        this.$ws.send(JSON.stringify(dataPacket),(e)=>{

          if(e.status==200){
            this.msgLog.push(e.chatPacket)
            this.chatPacket.msg = ''
          }else {
            console.log("error")
          }
        })

      }
    },
    mounted() {
      let user = this.$route.query.user;
      if (user == null){
        console.log("目标为空")
        return
      }
      this.chatPacket.receiverId = user.id
      let i = localStorage.getItem("userInfo");
      i = JSON.parse(i)
      this.chatPacket.senderId = i.id
      this.chatPacket.avatar = i.avatar
      this.username = i.username

      let dataPacket = {
        protocol: globalVar.protocol.CHAT_INIT,
        packet: {
          senderId: i.id,
          receiverId: user.id
        }
      }
      console.log("发送chat_init")
      this.$ws.send(JSON.stringify(dataPacket),(e)=>{
        if(e.status == 200){
          this.$notify.successNotify(e.msg)
        }else {
          this.$notify.errorNotify(e.msg)
        }
      })
    }

  }
</script>

<style scoped>

</style>
