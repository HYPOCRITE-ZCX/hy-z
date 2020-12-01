<template>
  <q-dialog v-model="show" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-white text-teal q-pa-md" style="width: 400px;height: 600px">

      <q-input bottom-slots v-model="text" label="Label" counter maxlength="12" dense>
        <template v-slot:hint>
          用户名/邮箱
        </template>
        <template v-slot:after>
          <q-btn round dense flat icon="search" />
        </template>
      </q-input>

      <q-list >

        <q-item
          v-for="(msg,index) in searchList"
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
            <q-icon name="person_add" />
          </q-item-section>
        </q-item>

      </q-list>
      <q-card-actions class="bg-white text-teal absolute-bottom">
        <q-btn flat
               label="CLOSE"
               @click="onClose"
        />
      </q-card-actions>
    </q-card>


  </q-dialog>
</template>

<script>
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
        searchList: searchList
      }
    },
    methods: {
      onClose(){
        this.$emit('onClose')
      }
    }
  }
</script>

<style scoped>

</style>
