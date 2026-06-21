import { createRouter, createWebHistory } from 'vue-router'

import { getToken } from '../utils/auth'

const routes = [

    {
        path: '/',
        redirect: '/home'
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
            },

            {
                path: 'course',

                component: () =>
                    import('../views/course/CourseList.vue')
            },

            {
                path: 'homework',

                component: () =>
                    import('../views/homework/HomeworkList.vue')
            },

            {
                path: 'score',

                component: () =>
                    import('../views/score/ScoreList.vue')
            },

            {
                path: 'statistics',

                component: () =>
                    import('../views/statistics/Statistics.vue')
            },

            {
                path:'submit',
                component:() =>
                    import('../views/submit/SubmitList.vue')
            }

        ]
    }

]

const router = createRouter({

    history: createWebHistory(),

    routes

})

router.beforeEach((to, from, next) => {

    const token = getToken()

    if (to.path === '/login') {

        next()

        return
    }

    if (!token) {

        next('/login')

        return
    }

    next()
})

export default router