
import Timeline from '../layouts/Timeline'
import User from '../layouts/User'
import Profile from '../pages/Profile'
import Index from '../pages/Index'
import ViewPost from '../pages/ViewPost'

const routes = [
  {
    path: '/user',
    component: User,
    children: [
      {
        path: 'profile',
        component: Profile
      }
    ]
  },
  {
    path: '/',
    component: Timeline,
    children: [
      { path: '', component: Index, meta: { transition: 'right' } },
      { path: '/post', component: ViewPost, meta: { transition: 'left' } }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '/loading',
    component: () => import('../pages/Loading.vue')
  })
  routes.push({
    path: '/error500',
    component: () => import('../pages/Error500.vue')
  })
  routes.push({
    path: '*',
    component: () => import('../pages/Error404.vue')
  })
}

export default routes
