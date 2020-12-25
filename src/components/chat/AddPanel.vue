<template>
  <q-dialog v-model="show" persistent transition-show="scale" transition-hide="scale">

    <q-card class="bg-white text-teal q-pa-md" style="width: 400px;height: 600px">
<!--      <q-bar>-->
<!--        <q-space />-->
<!--        <q-btn dense-->
<!--               flat-->
<!--               icon="close" />-->
<!--      </q-bar>-->

      <q-input bottom-slots v-model="target"
               label="用户名/邮箱"
               @keypress.enter="search"
               counter
               dense>
        <template v-slot:after>
          <q-btn round
                 dense
                 flat
                 @click="search"
                 icon="search"
          />
        </template>
      </q-input>


      <q-scroll-area style="height: 455px">
        <q-list >
          <q-item-label header>申请列表</q-item-label>
          <q-item
            v-for="(r,index) in requestList"
            :key="index"
            clickable
            v-ripple>
            <q-item-section avatar top>
              <q-avatar
                :icon="r.avatar"
                color="primary"
                text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{r.username}}</q-item-label>
              <q-item-label caption>{{r.remark}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="deep-orange"
                     size="sm"
                     @click.stop="ignoreRequest"
                     label="忽略" />
            </q-item-section>
            <q-item-section side>
              <q-btn color="secondary"
                     size="sm"
                     @click.stop="passRequest(r.id,r.receiverId)"
                     label="同意" />
            </q-item-section>
          </q-item>
        </q-list>

        <q-list >
          <q-item-label header>搜索结果</q-item-label>
          <q-item
            v-for="(u,index) in searchList"
            :key="index"
            clickable
            v-ripple>
            <q-item-section avatar top>
              <q-avatar
                :icon="u.avatar"
                color="primary"
                text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{u.remark}}</q-item-label>
              <q-item-label caption>{{u.date}}</q-item-label>
            </q-item-section>

            <q-item-section side @click.stop="addRequest(u.id)">
              <q-icon name="person_add" />
            </q-item-section>
          </q-item>

        </q-list>

      </q-scroll-area>

      <q-separator />

      <q-card-actions class="bg-white text-teal absolute-bottom" align="center">
        <q-btn flat
               label="CLOSE"
               @click="onClose"
        />
      </q-card-actions>

      <q-dialog v-model="addShow" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-teal text-white" style="width: 300px">
          <q-card-section>
            备注信息
            <q-input bottom-slots v-model="requestPacket.remark"
                     @keypress.enter="search"
                     counter
                     maxlength="12" dense>
            </q-input>
          </q-card-section>

          <q-card-section class="q-pt-none">
            选择分组
            <q-select color="orange" filled
                      v-model="defaultGroup"
                      :options="options"
                      option-value="id"
                      option-label="groupname"
                      label="group"
            />
          </q-card-section>

          <q-card-actions class="bg-white text-teal">
            <q-btn flat label="CANCEL" @click="addPanelClose" />
            <q-space />
            <q-btn flat label="SEND" @click="addUser" />
          </q-card-actions>

          <q-inner-loading :showing="group_visible">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </q-card>
      </q-dialog>

      <q-inner-loading :showing="visible">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>

    </q-card>


  </q-dialog>
</template>

<script>
  import globalVar from "src/store/globalvar";

  const searchList= [
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
  const requestList= [
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
  export default {
    name: "AddPanel",
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        searchList: searchList,
        requestList: requestList,
        target: '',
        visible: false,
        group_visible: false,
        addShow: false,
        isAdd: false,
        options: [
          {
            id: '1111',
            groupname: 'Google'
          },
          {
            id: '2222',
            groupname: 'Facebook'
          },
          {
            id: '3333',
            groupname: 'Twitter'
          },
          {
            id: '4444',
            groupname: 'Apple'
          },
        ],
        defaultGroup: {
          id: '1111',
          groupname: 'Google'
        },
        requestPacket:{
          id: '',
          senderId: '',
          receiverId: '',
          groupId: '',
          username: '',
          avatar: '',
          remark: '',
        }
      }
    },
    methods: {
      search(){
        this.visible = true
        this.$axios.get("/center/user-manage/search-xxx/"+this.target)
            .then( (response) => {
              let data = response.data.result
              this.visible = false
              if(data.status == 200){
                this.searchList = data.searchList
                this.$notify.successNotify(data.msg)
              }else {
                this.$notify.successNotify(data.msg)
              }
            })
      },
      addUser(){
        this.requestPacket.groupId = this.defaultGroup.id
        let dataPacket = null
        if(this.isAdd){
          dataPacket = {
            protocol: globalVar.protocol.ADD_USER,
            packet: this.requestPacket
          }
        }else {
          this.requestPacket.remark = this.requestPacket.username
          dataPacket = {
            protocol: globalVar.protocol.PASS_USER,
            packet: this.requestPacket
          }
        }
        this.$ws.send(JSON.stringify(dataPacket),(e)=>{
          if(e.status==200){
            this.$notify.successNotify(e.msg)
          }else {
            this.$notify.errorNotify(e.msg)
          }
        })
      },
      addRequest(receiverId){
        // this.requestPacket.id = id
        this.requestPacket.receiverId = receiverId
        this.addShow = true
        this.isAdd = true
        this.group_visible = true
        let userId = this.requestPacket.senderId
        this.$axios.get("/center/group-manage/get-group-name/"+userId)
            .then( (response) => {
              let data = response.data.result
              this.group_visible = false
              if(data.status == 200){
                this.options = data.groups
                this.defaultGroup = this.options[0]
                this.$notify.successNotify(data.msg)
              }else {
                this.$notify.successNotify(data.msg)
              }
            })

      },
      ignoreRequest(){

      },
      passRequest(receiverId){
        this.isAdd = false
        this.addRequest(receiverId)
      },
      addPanelClose(){
        this.addShow = false;
      },
      onClose(){
        this.$emit('onClose')
      }
    },
    mounted() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if(userInfo === null || userInfo === undefined){
        return
      }
      this.requestPacket.senderId = userInfo.id
      this.requestPacket.username = userInfo.username
      this.requestPacket.avatar = userInfo.avatar

      let userId = userInfo.id
      this.$axios.get("/center/user-manage/get-requests/"+userId)
        .then( (response) => {
          let data = response.data.result
          this.$notify.successNotify(data.msg)
          if(data.status == 200){
            this.requestList = data.requestList
          }else {
            this.requestList = null
          }
        })

    }
  }
</script>

<style scoped>

</style>
