export const routes = [
    {
        path: '/',
        name: 'root',
        component: () => import(/* webpackChunkName: "view-welcome" */ '@/resources/views/pages/Welcome'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: {name: 'root'},
    },
]
