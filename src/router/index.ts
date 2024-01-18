import { createRouter } from 'vue-router'
import type { RouterOptions, RouteRecordRaw } from 'vue-router'

const Index = () => import('./../components/map-container/index');

const routes: Array<RouteRecordRaw> = [
    {
        path : '/',
        name : 'index',
        component : Index
    }
];

const Router = createRouter({
    routes
} as RouterOptions)

export default Router