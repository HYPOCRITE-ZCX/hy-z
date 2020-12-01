<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-space />
          <q-btn stretch flat @click="registerPersistent = true" label="Register" />
          <q-separator vertical inset color="white" />
          <q-btn v-if="!isLogin" stretch flat @click="loginPersistent = true" label="Login" />
          <q-btn v-if="isLogin" stretch flat @click="logoutPersistent = true" label="Logout" />

          <register-panel @onClose="registerClose"
                          :show="registerPersistent">
          </register-panel>

          <login-panel @onClose="loginClose"
                       :show="loginPersistent">
          </login-panel>

          <logout-panel @onCLose="logoutClose"
                        :show="logoutPersistent">
          </logout-panel>

        </q-toolbar>
      </q-header>

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
<!--        </q-scroll-area>-->
      </q-drawer>

      <q-page-container>
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
      logoutPersistent: false,
      registerPersistent: false,
      isLogin: false,
    }
  },
  computed: {
    links: {
      get(){
        return this.$store.state.module.links
        // return this.$store.state.links
      }
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

    registerClose(){
      this.registerPersistent = false
    },
    loginClose(){
      this.loginPersistent = false
    },
    logoutClose(){
      this.logoutPersistent = false
    }
  }
}
</script>
