import Vue from 'vue'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.create({
  headers: {'Content-Type': 'application/json;charset=utf-8'},// 设置传输内容的类型和编码
  withCredentials: true,// 指定某个请求应该发送凭据。允许客户端携带跨域cookie，也需要此配置
  crossDomain: true
});

Vue.prototype.$axios = axios
