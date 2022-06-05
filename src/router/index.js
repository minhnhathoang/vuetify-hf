import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/views/Auth/Login";
import NotFound from "@/views/NotFound";

import Register from "@/views/Register";
import AddUser from "@/views/Manager/AddUser";
import License from "@/views/Business/License";
import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ListUser from "@/views/Manager/ListUser";
import ForgotPassword from "@/views/Auth/ForgotPassword";
import ResetPassword from "@/views/Auth/ResetPassword";
import EnterSecurityCode from "@/views/Auth/EnterSecurityCode";
import FormAddUser from "@/views/FormAddUser";
import DashBoard from "@/views/DashBoard";
import UserList from "@/views/UserList";
import UserDetails from "@/views/UserDetails";
import Setting from "@/views/Setting";
import CCalendar from "@/components/CCalendar";
import EstablishmentList from "@/views/EstablishmentList";
import EstablishmentDetails from "@/views/EstablishmentDetails";


const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
      },
      {
        path: '/password/reset',
        name: 'ResetPassword',
        props: true,
        component: ResetPassword
      },
      {
        path: '/enter-security-code',
        name: 'EnterSecurityCode',
        props: true,
        component: EnterSecurityCode
      },
    ]
  },

// Dashboard
  {
    path: '/',
    meta: {
      layout: 'layout'
    },
    name: 'DashBoard',
    component: DashBoard
  },

    // User

  {
    path: '/user/list',
    meta: {
      layout: 'layout'
    },
    name: 'UserList',
    component: UserList
  },
  {
    path: '/user/details/:id',
    meta: {
      layout: 'layout'
    },
    name: 'UserDetails',
    component: UserDetails
  },
  {
    path: '/user/add',
    meta: {
      layout: 'layout'
    },
    name: 'FormAddUser',
    component: FormAddUser
  },

    // Establishment
  {
    path: '/establishment/list',
    meta: {
      layout: 'layout'
    },
    name: 'EstablishmentList',
    component: EstablishmentList
  },
  {
    path: '/establishment/details/:id',
    meta: {
      layout: 'layout'
    },
    name: 'EstablishmentDetails',
    component: EstablishmentDetails
  },


  {
    path: '/account/setting',
    meta: {
      layout: 'layout'
    },
    component: Setting
  },
  {
    path: '/calendar',
    meta: {
      layout: 'layout'
    },
    component: CCalendar
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login')  next();
  if (localStorage.getItem('accessToken') === null && to.meta.layout == null) {
    next();
  } else if (localStorage.getItem('accessToken') === null) {
    next('/login');
  } else {
    next();
  }
});

export default router;
