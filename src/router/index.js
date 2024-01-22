// router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetails from '../views/MovieDetails.vue'
import SearchView from '../views/SearchView.vue' // Import the new component
import ShowDetails from '../views/ShowDetails.vue' // Import the ShowDetails component

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
    props: true,
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView
  },
  {
    path: '/show/:id', 
    name: 'ShowDetails', 
    component: ShowDetails, 
    props: true 
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
