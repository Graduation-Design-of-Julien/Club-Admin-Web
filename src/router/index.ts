import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Login from "../pages/login.vue";
import ResetPwd from "../pages/resetPwd.vue";



const routes: Array<RouteRecordRaw> = [
    { path: "/login", component: Login },
    { path: "/reset", component: ResetPwd },
    // { path: '/about', component: About },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
