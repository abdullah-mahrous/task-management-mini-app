import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {
            title: "Abdullah Mahrous - Full-Stack Developer",
            description: "Full-Stack Developer specializing in Vue, React, Node and Express. Explore my projects, technical notes, and development journey." 
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    document.title = to.meta.title || to.name
})

export default router