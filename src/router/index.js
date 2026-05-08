// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import CandidateView from '../views/candidate/Candidate.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', redirect: '/ung-vien' },
    { path: '/ung-vien', name: 'candidate', component: CandidateView }
  ]
})

export default router