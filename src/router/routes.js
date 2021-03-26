import MainLayout from 'layouts/MainLayout.vue';
import Homepage   from 'pages/Homepage.vue';

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {path: '', component: Homepage}
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
