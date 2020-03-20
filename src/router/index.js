import Vue from 'vue'
import VueRouter from 'vue-router'
import Podcasts from '../views/Podcasts.vue'
import SpacesTable from '../views/SpacesTable.vue'

import PodcastsShow from '../views/PodcastsShow.vue'
import AdvertisersShow from '../views/AdvertisersShow.vue'

import BidsNew from '../views/BidsNew.vue'
import SpacesNew from '../views/SpacesNew.vue'

import UsersEdit from '../views/UsersEdit.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'

import MessagesIndex from '../views/MessagesIndex.vue'


Vue.use(VueRouter)

const routes = [

  {path: '/', name: 'spaces-table', component: SpacesTable},
  {path: '/podcasts', name: 'podcasts', component: Podcasts},
  {path: '/podcasts/:id', name: 'podcasts-show', component: PodcastsShow},
  {path: '/advertisers/:id', name: 'advertisers-show', component: AdvertisersShow},

  {path: '/bids/new', name: 'bids-new', component: BidsNew},
  {path: '/spaces/new', name: 'spaces-new', component: SpacesNew},

  {path: '/users/:id/edit', name: 'users-edit', component: UsersEdit},

  {path: '/signup', name: 'signup', component: Signup},
  {path: '/login', name: 'login', component: Login},
  {path: '/logout', name: 'logout', component: Logout},
  {path: '/messages', name: 'messages-index', component: MessagesIndex}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
