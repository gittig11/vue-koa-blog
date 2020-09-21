import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import store from '../store/index'

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "*",
  //   redirect: '/home',
  // },
  {
    path: "/",
    redirect: '/home',
  },
  {
    path: "/loginpage",
    name: "LoginPage",
    component: () =>
      import("@/views/LoginPage.vue")
  },
  {
    path: "/articles/:id",
    name: "Articles",
    component: () =>
      import("@/components/Articles.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("@/components/Login.vue")
  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import("@/components/Logout.vue")
  },
  {
    path: "/display",
    name: "Display",
    component: () =>
      import("@/components/Display.vue"),
    meta: {
      requiresAuth: false
    }
  },
];

const router = new VueRouter({
  routes
});

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // let token = store.state.token;
  
  let token = window.sessionStorage.getItem('token')
  if (to.meta.requiresAuth) {
    if (token) {  // 有token时
      // store.dispatch('getUser')
      // next()
      // http://localhost:8080/#/login?redirect=%2Fabout
      if(Object.keys(from.query).length === 0){//判断路由来源是否有query，处理不是目的跳转的情况
        next()
      }
      else {
        let redirect = from.query.redirect
        if(to.path === redirect){
          next()
        }
        else{
          next({path:redirect})
        }
      }
    }
    else {  // 没有token时
      // store.dispatch('logOut')
      next({
        path: '/loginpage',
        query: { redirect: to.fullPath }
      })
    }
  }
  else {
    next()
  }
})

export default router;
