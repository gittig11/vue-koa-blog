import axios from 'axios'
// import router from './router'
// import store from './store'

//创建axios实例
var instance = axios.create({
  timeout: 5000, //请求超过5秒即超时返回错误
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  baseURL: 'http://localhost:3000'
});

//request拦截器
instance.interceptors.request.use(
  config => {
    // 登录后端 http://localhost:3000 的鉴权
    let token = window.localStorage.getItem('token');
    // console.log(token)
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    // if (store.state.token) {
    //   config.headers.Authorization = `token ${store.state.token}`;
    // }
    return config;
  }
);

//respone拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:  // auth不通过
          // store.dispatch('UserLogout'); //可能是token过期，清除它
          alert("请先以管理员身份登录~");
          /*router.replace({ //跳转到登录页面
            path: 'login',
            query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          });*/
          break;
        case 409:
          alert("用户名已经存在~");
          break;
      }
    }
    return Promise.reject(error.response);
  }
);

export default {
  //用户注册
  userRegister(data) {
    return instance.post('/users', data);  // http://localhost:3000/users
  },
  //用户登录
  userLogin(data) {
    return instance.post('/users/login', data);
  },
  //获取用户
  getUsers() {
    return instance.get('/users');
  },
  //删除用户
  delUser(data) {
    return instance.post('/users/delUser', data);
  }
}
