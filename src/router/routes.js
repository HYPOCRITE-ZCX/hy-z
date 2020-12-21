
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'index', component: () => import('pages/Index.vue') },
      {
        path: 'chat', component: () => import('pages/Chat.vue') ,
        children: [
          { path: 'chat-box', component: () => import('components/chat/ChatBox') },
          { path: 'jump', component: () => import('components/chat/Jump') }
        ]
      },
      {
        path: 'video', component: () => import('pages/Video.vue') ,
        children: [
          {path: 'player',component: () => import('components/video/Player')}
        ]
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
