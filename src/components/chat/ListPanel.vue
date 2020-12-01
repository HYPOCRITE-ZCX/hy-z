<template>
  <div>
    <!--        卡片-->
    <q-tabs
      dense
      align="justify"
      v-model="tab"
      indicator-color="purple"
      class="bg-teal text-white shadow-2">
      <q-tab name="mails" icon="message" label="Message">
        <q-badge color="red" floating>2</q-badge>
      </q-tab>
      <q-tab name="alarms" icon="group" label="Group">
        <q-badge color="red" floating>10+</q-badge>
      </q-tab>
    </q-tabs>

    <!--        <q-scroll-area style="height: calc(100% - 150px);border-right: 1px solid #ddd">-->

    <!--          消息面板-->
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mails" >
        <q-list >
          <!--                <q-item-label header>Folders</q-item-label>-->
          <q-item
            v-for="(msg,index) in msgList"
            :key="index"
            clickable
            v-ripple>
            <q-item-section avatar top>
              <q-avatar
                :icon="msg.avatar"
                color="primary"
                text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{msg.remark}}</q-item-label>
              <q-item-label caption>{{msg.date}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="info" color="green" />
            </q-item-section>
          </q-item>

        </q-list>
      </q-tab-panel>

      <!--            好友列表面板-->

      <q-tab-panel name="alarms">

        <q-expansion-item
          v-for="(g,index) in groups"
          :key="g+index"
          expand-separator
          :label="g.groupname">
          <q-list>
            <q-item
              v-for="(u,index) in g.users"
              @click="getDetail"
              :key="u+index"
              class="q-my-sm"
              clickable
              v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ u.avatar }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ u.remark }}</q-item-label>
                <q-item-label caption lines="1">{{ u.email }}</q-item-label>
              </q-item-section>

              <q-item-section side
                              @click.stop="toChat(u)">
                <q-icon name="chat_bubble"
                        color="gray"
                />
              </q-item-section>
            </q-item>

          </q-list>
        </q-expansion-item>

      </q-tab-panel>
    </q-tab-panels>

    <!--        </q-scroll-area>-->
  </div>
</template>

<script>

  const msgList= [
    {
      userId: '123456',
      avatar: 'avatar2.jpg',
      username: 'HYPOCRITE',
      remark: 'zcx',
      date: '2020-01-08'
    },
    {
      userId: '123456',
      avatar: 'avatar2.jpg',
      username: 'HYPOCRITE',
      remark: 'zcx',
      date: '2020-01-08'
    },
    {
      userId: '123456',
      avatar: 'avatar2.jpg',
      username: 'HYPOCRITE',
      remark: 'zcx',
      date: '2020-01-08'
    },
    {
      userId: '123456',
      avatar: 'avatar2.jpg',
      username: 'HYPOCRITE',
      remark: 'zcx',
      date: '2020-01-08'
    }
  ]
  const  groups = [
    {
      groupname: '朋友',
      users: [
        {
          // color: 'blue',
          // icon: 'mdi-clipboard-text',
          id: '',
          username: 'sfse',
          email: 'wstapforth5@pcworld.com',
          avatar: 'avatar2.jpg',
          remark: '1号朋友'
        },
        {
          id: '',
          username: 'gbgbg',
          email: 'wstapforth5@pcworld.com',
          avatar: 'avatar2.jpg',
          remark: '2号朋友'
        }
      ]
    },
    {
      groupname: '家人',
      users: [
        {
          id: '',
          username: 'dddd',
          email: 'wstapforth5@pcworld.com',
          avatar: 'avatar2.jpg',
          remark: '1号家人'
        }
      ]
    },
    {
      groupname: '同学',
      users: [
        {
          id: '',
          username: 'ffff',
          email: 'wstapforth5@pcworld.com',
          avatar: 'avatar2.jpg',
          remark: '1号同学'
        },
        {
          id: '',
          username: 'bbbb',
          email: 'wstapforth5@pcworld.com',
          avatar: 'avatar2.jpg',
          remark: '2号同学'
        },
        {
          id: '',
          username: 'aaa',
          email: 'wstapforth5@pcworld.com',
          avatar: 'avatar2.jpg',
          remark: '3号同学'
        }
      ]
    }
  ]

  import globalVar from "src/store/globalvar";

  export default {
    name: "ListPanel",
    // props: {
    //   msgList: {
    //     type: Array,
    //     default: []
    //   },
    //   groups: {
    //     type: Array,
    //     default: []
    //   }
    // },
    data(){
      return {
        tab: 'images',
        chat_bubble_color: 'white',
        msgList: [],
        groups:[]
      }
    },
    methods: {
      toChat(user){
        // alert("to chat")
        this.$emit('toChat',user)
      },
      getDetail(){
        alert("get detail")
      }
    },
    mounted() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if(userInfo === null || userInfo === undefined){
        return
      }
      let dataPacket = {
        protocol: globalVar.protocol.LIST_PANEL_LOAD,
        packet: {
          senderId: userInfo.id,
        }
      }
      this.$ws.send(JSON.stringify(dataPacket),(e)=>{
        if(e.status==200){
          this.groups = e.userGroupInfo
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
