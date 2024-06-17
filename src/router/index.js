import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginView from '../views/loginView.vue'
import Layout from '../views/Layout.vue'
import RegisterView from '../views/RegisterView.vue'
import OwnMasgView from '../views/OwnMasgView.vue'
import AttendanceView from '../views/AttendanceView.vue'
import OverTimeView from '../views/OverTimeView.vue'
import DepartmentView from '../views/DepartmentView.vue'
import SalariesView from '../views/SalariesView.vue'
import text from '../views/text.vue'
import OwnSalView from '../views/OwnSalView.vue'
import PositionView from "@/views/PositionView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: loginView
  },
  {
    path: '/register',
    name:'register',
    component: RegisterView
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'text',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
      {
        path: 'OwnMasg',
        name: 'OwnMasg',
        component: OwnMasgView
      },
      {
        path: 'Attendance',
        name: 'Attendance',
        component: AttendanceView
      },
      {
        path: 'OverTime',
        name: 'OverTime',
        component: OverTimeView
      },
      {
        path: 'Department',
        name: 'Department',
        component: DepartmentView
      },
      {
        path: 'Salary',
        name: 'Salary',
        component: SalariesView
      },
      {
        path: 'Textsl',
        name: 'Textsl',
        component:text
      },
      {
        path: 'OwnSal',
        name: 'OwnSal',
        component:OwnSalView
      },
      {
        path: 'Position',
        name: 'Position',
        component:PositionView
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//守卫
router.beforeEach((to, from, next) => {
  if (to.path ==='/login') {
    next()
  } 
    const user = localStorage.getItem('user')
  if (!user && to.path!== '/login' && to.path !== '/register') {
    return next('/login')
  }
  next();
})
export default router
