export default function () {
  return {
    //是否登陆
    isLogin: false,
    //保存主页面四个主要功能按钮链接
    links: [
      {
        to: '/share',
        icon: 'dynamic_feed',
        text: 'Share',
        color: ''
      },
      {
        to: '/music',
        icon: 'album',
        text: 'Music',
        color: ''
      },
      {
        to: '/video',
        icon: 'video_library',
        text: 'Video ',
        color: ''
      },
      {
        to: '/chat',
        icon: 'forum',
        text: 'Chat ',
        color: ''
      },
    ],
  }
}
