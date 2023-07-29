import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {
  Monitor, Avatar, DocumentChecked
} from '@element-plus/icons-vue'
import { shallowRef } from 'vue'

const routes: Array<RouteRecordRaw>  = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/HomeView.vue'),
    redirect: '/visual',
    children: [
      {
        path: '/visual',
        name: 'visual',
        component: () => import('../views/home/visual/VisualView.vue'),
        meta: {
          title: '数据展示',
          isUser: false,
          icon: shallowRef(Monitor)
        }
      },
      {
        path: '/user',
        name: 'user',
        redirect: '/user/adduser',
        meta: {
          title: '用户信息管理',
          isUser: true,
          icon: shallowRef(DocumentChecked)
        },
        children: [
          {
            path: '/user/adduser',
            name: 'adduser',
            component: () => import('../views/home/user/AddUser.vue'),
            meta: {
              classifyTitle: "用户信息管理",
              title: '添加用户'
            },
          },
          {
            path: '/user/userlist',
            name: 'userlist',
            component: () => import('../views/home/user/UserList.vue'),
            meta: {
              classifyTitle: "用户信息管理", 
              title: '用户列表',
            },
          }
        ]
      },
      {
        path: '/record',
        name: 'record',
        redirect: '/record/addrecord',
        meta: {
          title: '卫生记录管理',
          isUser: false,
          icon: shallowRef(Avatar)
        },
        children: [
          {
            path: '/record/addrecord',
            name: 'addrecord',
            component: () => import('../views/home/record/AddRecord.vue'),
            meta: {
              classifyTitle: "卫生记录管理",
              title: '添加记录',
            },
          },
          {
            path: '/record/recordlist',
            name: 'recordlist',
            component: () => import('../views/home/record/RecordList.vue'),
            meta: {
              classifyTitle: "卫生记录管理",
              title: '记录列表'
            },
          }
        ]
      },
      {
        path: '/emergency',
        name: 'emergency',
        redirect: '/emergency/addemergency',
        meta: {
          title: '处理记录管理',
          isUser: false,
          icon: shallowRef(Avatar)
        },
        children: [
          {
            path: '/emergency/addemergency',
            name: 'addemergency',
            component: () => import('../views/home/emergency/AddEmergency.vue'),
            meta: {
              classifyTitle: "处理记录管理",
              title: '添加记录',
            },
          },
          {
            path: '/emergency/emergencylist',
            name: 'emergencylist',
            component: () => import('../views/home/emergency/EmergencyList.vue'),
            meta: {
              classifyTitle: "处理记录管理",
              title: '记录列表'
            },
          }
        ]
      },
      {
        path: '/member',
        name: 'member',
        redirect: '/member/addmember',
        meta: {
          title: '委员信息管理',
          isUser: false,
          icon: shallowRef(Avatar)
        },
        children: [
          {
            path: '/member/addmember',
            name: 'addmember',
            component: () => import('../views/home/member/AddMember.vue'),
            meta: {
              classifyTitle: "委员信息管理",
              title: '添加委员',
            },
          },
          {
            path: '/member/memberlist',
            name: 'memberlist',
            component: () => import('../views/home/member/MemberList.vue'),
            meta: {
              classifyTitle: "委员信息管理",
              title: '委员列表'
            },
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
/**
 * 全局守卫登录后才可以进入首页
 * to: 即将要进入的目标路由
 * from: 当前导航正要离开的路由
 */
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'login' && !token) next({ name: 'login' })
  else next()
})

export default router
