import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    {
        path: '/',
        redirect: '/login'
    },

    {
        path: '/login',
        component: () =>
            import('../views/login/Login.vue')
    },

    {
        path: '/',
        component: () =>
            import('../layout/Layout.vue'),

        children: [

            {
                path: 'home',
                component: () =>
                    import('../views/home/Home.vue')
            }

        ]
    }

]

const router = createRouter({

    history: createWebHistory(),

    routes

})

export default router