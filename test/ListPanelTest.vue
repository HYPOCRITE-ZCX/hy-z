<template>
  <div>
    <!--        卡片-->
    <q-tabs
      dense
      align="justify"
      v-model="tab"
      indicator-color="purple"
      class="bg-primary text-white shadow-2">
      <q-tab name="mails" icon="mail" label="Mails">
        <q-badge color="red" floating>2</q-badge>
      </q-tab>
      <q-tab name="alarms" icon="alarm" label="Alarms">
        <q-badge color="red" floating>10+</q-badge>
      </q-tab>
    </q-tabs>

    <!--        <q-scroll-area style="height: calc(100% - 150px);border-right: 1px solid #ddd">-->

    <!--          消息面板-->
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mails">
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
          expand-separator
          :label="g.groupname">
          <q-list>
            <q-item
              v-for="(u,index) in g.users"
              :key="u.id"
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

              <q-item-section side>
                <q-icon name="chat_bubble" color="green" />
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
  export default {
    name: "ListPanelTest"
  }
</script>

<style scoped>

</style>
