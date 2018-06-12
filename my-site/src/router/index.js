import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('../page/index.vue')
const Home = () => import('../page/Home/home.vue')
const Posts = () => import('../page/Post/posts.vue')
const Post = () => import('../page/Post/post.vue')
// const WritePost = () => import('../page/Post/writepost.vue')
const WritePostMd = () => import('../page/Post/writemd.vue')
const About = () => import('../page/User/about.vue')
const Login = () => import('../page/User/login.vue')
const Register = () => import('../page/User/register.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/home',
      children: [
        {path: 'home', component: Home, meta: { keepAlive: true }},
        {path: 'posts', component: Posts},
        {path: 'post', component: Post},
        {path: 'writepost', component: WritePostMd},
        {path: 'about', component: About, meta: { keepAlive: true }},
        {path: 'postDetail', component: Post}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
