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
        component: ResetPassword
      },
      {
        path: '/enter-security-code',
        name: 'EnterSecurityCode',
        component: EnterSecurityCode
      },
    ]
  },
  {
    path: '/',
    meta: {
      layout: 'layout'
    },
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: '/user/add',
    meta: {
      layout: 'layout'
    },
    name: 'FormAddUser',
    component: FormAddUser
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

// router.beforeEach((to, from, next) => {
//   console.log("check" + localStorage.getItem('accessToken'));
//   if (to.meta.isGuest == null && !localStorage.getItem('accessToken')) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;
