import Vue from 'vue'
import Router from '../router/index'

const globalFunc= {

  successNotify(info){
    Vue.prototype.$q.notify({
      position: 'top-right',
      color: 'positive',
      timeout: 3000,
      actions: [{ icon: 'close', color: 'white' }],
      message: info
    })
  },
  errorNotify(info){
    Vue.prototype.$q.notify({
      position: 'top-right',
      timeout: 3000,
      color: 'negative',
      actions: [{ icon: 'close', color: 'white' }],
      message: info
    })
  },
  chatNotify(chatPacket){
    Vue.prototype.$q.notify({
      position: 'top-right',
      caption: chatPacket.username,
      message: chatPacket.msg,
      color: 'info',
      timeout: 5000,
      avatar: chatPacket.avatar,
      actions: [
        {
          label: 'Reply',
          color: 'yellow',
          handler: () => {
            let user = localStorage.getItem('userInfo');
            if(user == null || user == undefined){
              return
            }
            Router.push({
              path: '/chat/jump',
              query: {
                user: user
              }
            })
          }
        },
        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
      ]
    })
  },
  serverNotify(packet){
    Vue.prototype.$q.notify({
      position: 'top-right',
      caption: packet.username,
      message: packet.msg,
      color: 'purple',
      timeout: 5000,
      avatar: packet.avatar,
    })
  }
}

Vue.prototype.$notify = globalFunc

