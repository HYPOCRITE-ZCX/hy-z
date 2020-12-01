<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" container style="height: 600px" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>{{chatTarget}}</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="500"
        :breakpoint="400">

        <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 150px;display: block">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm cursor-pointer" @click="addPanel = true">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold cursor-pointer">
              {{ user.username }}
              <q-popup-edit v-model="modifyInfo.username" content-class="bg-accent text-white">
                <q-input dark color="white" v-model="modifyInfo.username" dense autofocus counter>
                  <template v-slot:append>
                    <q-icon
                      @click="editUsername"
                      class="cursor-pointer"
                      name="edit" />
                  </template>
                </q-input>
              </q-popup-edit>
            </div>
            <div class="cursor-pointer">
              {{ user.email }}
              <q-popup-edit v-model="modifyInfo.email" content-class="bg-accent text-white">
                <q-input dark color="white" v-model="modifyInfo.email" dense autofocus counter>
                  <template v-slot:append>
                    <q-icon
                      @click="editEmail"
                      class="cursor-pointer"
                      name="edit" />
                  </template>
                </q-input>
              </q-popup-edit>
            </div>
          </div>
        </q-img>

<!--        <list-panel :msg-list="msgList"-->
<!--                    :groups="groups"-->
<!--        />-->
        <list-panel @toChat="toChat"></list-panel>

        <add-panel :show="addPanel"
                   @onClose="onCloseAddPanel">
        </add-panel>

      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

    </q-layout>
  </div>
</template>

<script>

  import ListPanel from "components/chat/ListPanel";
  import AddPanel from "components/chat/AddPanel";
  export default {
    name: "Chat",
    components: {AddPanel, ListPanel},
    data () {
      return {
        drawer: false,
        addPanel: false,
        tab: 'images',
        chatTarget: '',
        user: {
          username: 'HYPOCRITE',
          email: 'zcx981206@163.com'
        },
        modifyInfo: {
          username: null,
          email: null
        },

      }
    },
    methods: {
      editUsername(){
        alert(this.modifyInfo.username)
      },
      editEmail(){
        alert(this.modifyInfo.email)
      },
      toChat(user){
        this.chatTarget = user.remark
        this.$router.push({
          path: '/chat/jump',
          query: {
            user: user
          }
        })
      },
      onCloseAddPanel(){
        this.addPanel = false
      }
    },
    mounted() {
      let user = localStorage.getItem('userInfo');
      if(user == null || user == undefined){
        return
      }
      this.user = JSON.parse(user)
    }
  }
</script>

<style scoped>

</style>
