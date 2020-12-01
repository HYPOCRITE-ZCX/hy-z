import Vue from 'vue'
import globalVar from "src/store/globalvar";
let WS = {}
let global_callback = null
let list_panel_load_callback = null
let heartbeat_callback = null
let chat_init_callback = null
let chat_callback = null
let listen_msg_callback = null
const ws = {

  init(){
    if( typeof(WebSocket) != "function" ) {
      alert("您的浏览器不支持Websocket通信协议，请更换浏览器为Chrome或者Firefox再次使用！")
      return
    }
    WS = new WebSocket("ws://127.0.0.1:8888/moon")
    console.log("全局websocket建立连接")
    WS.onopen = this.open
    WS.onmessage = this.message
    WS.onclose = this.close
    WS.onerror = this.error
  },

  open(){
    console.log("open触发")
  },

  message(msg){
    console.log("message触发")
    let data = msg.data;
    data = JSON.parse(data).result
    switch (data.protocol) {
      case globalVar.protocol.GLOBAL_LISTEN_INFO:
        console.log("接收消息，触发global_callback回调")
        global_callback(data)
        break
      case globalVar.protocol.LIST_PANEL_LOAD:
        console.log("接收消息，触发list_panel_load_callback回调")
        list_panel_load_callback(data)
        break
      case globalVar.protocol.CHAT_INIT:
        console.log("接收消息，触发chat_init_callback回调")
        chat_init_callback(data)
        break
      case globalVar.protocol.CHAT:
        console.log("接收消息，触发chat_callback回调")
        chat_callback(data)
        break
    }
  },

  close(){
    console.log("close触发")
    localStorage.removeItem("userInfo")
  },

  error(e){
    console.log("error触发")
  },

  sendDataPack(dataPack){
    WS.send(dataPack)
  },

  send(dataPacket,callback){
    const data = JSON.parse(dataPacket)
    switch (data.protocol) {
      case globalVar.protocol.GLOBAL_LISTEN_INFO:
        console.log("发送消息，设置global_callback回调")
        global_callback = callback
        break
      case globalVar.protocol.LIST_PANEL_LOAD:
        console.log("发送消息，设置list_panel_load_callback回调")
        list_panel_load_callback = callback
        break
      case globalVar.protocol.CHAT_INIT:
        console.log("发送消息，设置chat_init_callback回调")
        chat_init_callback = callback
        break
      case globalVar.protocol.CHAT:
        console.log("发送消息，设置chat_callback回调")
        chat_callback = callback
        break
    }
    // dataPacket = JSON.stringify(dataPacket)
    if (WS.readyState === WS.OPEN) {
      console.log("ws开启")
      //若是ws开启状态
      this.sendDataPack(dataPacket)
    }else if (WS.readyState === WS.CONNECTING) {
      console.log("ws正在开启")
      // 若是 正在开启状态，则等待1s后重新调用
      setTimeout(function () {
        ws.send(dataPacket,callback)
      }, 1000);
    }else {
      console.log("ws未开启")
      // 若未开启 ，则等待1s后重新调用
      setTimeout(function () {
        ws.send(dataPacket,callback)
      }, 1000);
    }
  }

}

Vue.prototype.$ws = ws;


