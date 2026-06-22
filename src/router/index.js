import { createRouter, createWebHistory } from 'vue-router'

import { getToken } from '../utils/auth'

const routes = [

    {
        path: '/',
        redirect: '/dashboard'
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
                path: 'dashboard',

                component: () =>
                    import('../views/dashboard/Dashboard.vue')
            },

            {
                path: 'course',

                component: () =>
                    import('../views/course/CourseList.vue')
            },

            {
                path: 'user',

                component: () =>
                    import('../views/user/UserList.vue')
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
            },

            {
                path: 'grade',
                component: () =>
                    import('../views/grade/GradeList.vue')
            }

        ]
    }

]

const router = createRouter({

    history: createWebHistory(),

    routes

})

router.beforeEach((to, from) => {

    const token = getToken()

    if (to.path === '/login') {
        if (token) {
            return '/dashboard'
        }
        return
    }

    if (!token) {
        return '/login'
    }
})

export default router