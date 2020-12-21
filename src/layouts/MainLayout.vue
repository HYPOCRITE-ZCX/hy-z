<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
<!--      <q-header elevated class="bg-black">-->
<!--        <q-toolbar>-->
<!--          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />-->
<!--          <q-space />-->
<!--          <q-btn stretch flat @click="registerPersistent = true" label="Register" />-->
<!--          <q-separator vertical inset color="white" />-->
<!--          <q-btn v-if="!isLogin" stretch flat @click="loginPersistent = true" label="Login" />-->
<!--          <q-btn v-if="isLogin" stretch flat @click="logoutPersistent = true" label="Logout" />-->

<!--          <register-panel @onClose="registerClose"-->
<!--                          :show="registerPersistent">-->
<!--          </register-panel>-->

<!--          <login-panel @onClose="loginClose"-->
<!--                       :show="loginPersistent">-->
<!--          </login-panel>-->

<!--          <logout-panel @onCLose="logoutClose"-->
<!--                        :show="logoutPersistent">-->
<!--          </logout-panel>-->

<!--        </q-toolbar>-->
<!--      </q-header>-->

<!--      主侧边栏-->

      <q-drawer v-model="drawer"
                show-if-above
                :mini="miniState"
                @mouseover="miniState = false"
                @mouseout="miniState = true"
                :width="200"
                :breakpoint="500"
                bordered
                content-class="bg-grey-3">
<!--        <q-scroll-area class="fit">-->
          <q-list padding>

            <q-item v-for="(link,index) in links"
                    :key="index"
                    :to="link.to"
                    clickable
                    v-ripple>
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section>
                {{link.text}}
              </q-item-section>
            </q-item>

          </q-list>

          <q-list padding
                  class="absolute-bottom">
            <q-item>
              <q-btn round dense flat color="grey-8" icon="notifications">
                <q-badge color="red" text-color="white" floating>
                  2
                </q-badge>
              </q-btn>
            </q-item>

            <q-separator />

            <q-item>
              <q-btn round
                     flat
                     v-if="!isLogin"
                     @click="loginPersistent = true">
                <q-avatar size="36px">
                  <img src="https://cdn.quasar.dev/img/account-avatar.png">
                </q-avatar>
                <q-tooltip>Account</q-tooltip>
              </q-btn>

              <q-btn round
                     flat
                     v-if="isLogin"
                     @click="logoutPersistent = true">
                <q-avatar size="36px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
                <q-tooltip>Account</q-tooltip>
              </q-btn>

            </q-item>
          </q-list>
      </q-drawer>


      <login-panel @onClose="loginClose"
                   :show="loginPersistent">
      </login-panel>

      <logout-panel @onClose="logoutClose"
                    :show="logoutPersistent">
      </logout-panel>


      <q-page-container style="height: 100%">
        <router-view />
      </q-page-container>

    </q-layout>
  </div>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import RegisterPanel from "components/user/RegisterPanel";
import LoginPanel from "components/user/LoginPanel";
import LogoutPanel from "components/user/LogoutPanel";


export default {
  name: 'MainLayout',
  components: {LogoutPanel, LoginPanel, RegisterPanel, EssentialLink },
  data () {
    return {
      drawer: false,
      miniState: true,
      loginPersistent: false,
      logoutPersistent: false
    }
  },
  computed: {
    links: {
      get(){
        return this.$store.state.module.links
      }
    },
    isLogin(){
      return this.$store.state.module.isLogin
    }
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    loginClose(){
      this.loginPersistent = false
    },
    logoutClose(){
      this.logoutPersistent = false
    }
  },
  mounted() {
    let user = localStorage.getItem('userInfo');
    if(user == null || user == undefined){
      this.$q.loading.hide()
      return
    }
    if(this.$ws.readyState !== this.$ws.OPEN){
      console.log("ws重新连接")
      this.$ws.init()
    }
  }
}
</script>
