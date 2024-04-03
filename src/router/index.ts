import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import ResetPwd from "../pages/ResetPwd.vue";
import LoginPage from "../pages/LoginPage.vue";


const routes: Array<RouteRecordRaw> = [
    { path: "/login", component: LoginPage },
    { path: "/reset", component: ResetPwd },
    // { path: '/about', component: About },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
