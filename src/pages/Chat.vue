<template>
<!--  <div class="q-pa-md">-->
    <q-layout view="lHh Lpr lff" container style="height: 700px" class="shadow-2 rounded-borders">
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
          <div class="bg-transparent" style="width: 100%;height: 100%">
            <div>
              <q-avatar size="56px" class="q-mb-sm cursor-pointer" >
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
              <q-btn dense flat
                     icon="person_add"
                     class="float-right q-ml-md"
                     @click="onOpenaddPanel"
              />
              <q-btn dense flat icon="notifications" class="float-right">
                <q-badge color="red" text-color="white" floating>
                  2
                </q-badge>
              </q-btn>
            </div>

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
<!--  </div>-->
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
      onOpenaddPanel(){
        this.addPanel = true
      },
      onCloseAddPanel(){
        this.addPanel = false
      }
    },
    mounted() {
      this.$q.loading.show()
      if(this.$ws.readyState != this.$ws.OPEN){
        console.log("ws重新连接")
        this.$ws.init()
      }
      let user = localStorage.getItem('userInfo');
      if(user == null || user == undefined){
        this.$q.loading.hide()
        return
      }
      this.user = JSON.parse(user)
      this.$q.loading.hide()
    }
  }
</script>

<style scoped>

</style>
