const globalVar= {
  centerUrl: 'http://127.0.0.1:8181',
  chatUrl: 'http://127.0.0.1:8282',
  protocol: {
    OPEN: 'OPEN', //开启ws服务
    CHAT: 'CHAT', //聊天
    CHAT_INIT: 'CHAT_INIT', //聊天页面初始化准备
    USER_GOES_ONLINE: 'USER_GOES_ONLINE', //用户上线
    LIST_PANEL_LOAD: 'LIST_PANEL_LOAD', //用户列表加载
    GLOBAL_LISTEN_INFO: 'GLOBAL_LISTEN_INFO', //全局监听消息
    CHAT_NOTIFY: 'CHAT_NOTIFY', //聊天消息通知
    HEARTBEAT: 'HEARTBEAT', //心跳
  },
  dataType: {
    TEXT: 'TEXT', //普通文本
    DOC: 'DOC', //文档
    IMG: 'IMG', //图片
    MEDIA: 'MEDIA' //媒体
  }
}

export default globalVar
