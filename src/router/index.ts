import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {
            title: "Tasks Manager - My Tasks",
        }
    },
    {
        path: '/tasks/:id',
        name: 'taskDetails',
        component: () => import('../views/TaskDetailsView.vue'),
        meta: {
            title: "Task Details",
        }
    },
    {
        path: '/tasks/new',
        name: 'addTask',
        component: () => import('../views/AddTaskView.vue'),
        meta: {
            title: "Add New Task",
        }
    },
    {
        path: '/tasks/:id/edit',
        name: 'editTask',
        component: () => import('../views/EditTaskView.vue'),
        meta: {
            title: "Edit Task",
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('../views/NotFoundView.vue'),
        meta: {
            title: "Not Found",
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// adding title dynamiclly to every route
router.beforeEach((to) => {
    document.title = to.meta.title || to.name
})

export default router