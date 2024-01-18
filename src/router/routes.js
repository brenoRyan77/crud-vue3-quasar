import IndexPage from 'pages/IndexPage.vue'
import ChatMessage from '../views/ChatMessage.vue'
import MainLayout from 'layouts/MainLayout.vue'
import FormUsuario from 'pages/FormUsuario.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: IndexPage },
      { path: '/chat', name: 'chat', component: ChatMessage },
      { path: '/usuario/:id?', name: 'formUsuario', component: FormUsuario }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
