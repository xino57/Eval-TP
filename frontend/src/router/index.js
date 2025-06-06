import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/factures',
      name: 'factures',
      component: () => import('../views/FactureView.vue'),
    },
    {
      path: '/facture/:id',
      name: 'facture',
      props: true,
      component: () => import('../views/FactureDetailView.vue'),
    },
    {
      props: true,
      path: '/facture/edit/:id',
      name: 'facture-edit',
      component: () => import('../views/FactureEditView.vue'),
    }
  ],
})

export default router
