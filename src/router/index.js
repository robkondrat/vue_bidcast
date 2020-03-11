import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import SpacesTable from '..views/SpacesTable.vue'
import Podcasts from '../views/Podcasts.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'Home', component: Home},
  // {path: '/spaces/table', name: 'spaces-table', component: SpacesTable}
  {path: '/podcasts', name: 'podcasts', component: Podcasts},
  {path: '/signup', name: 'signup', component: Signup},
  {path: '/login', name: 'login', component: Login}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
