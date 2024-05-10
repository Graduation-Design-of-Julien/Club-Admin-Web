import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import ResetPwd from "../pages/ResetPwd.vue";
import LoginPage from "../pages/LoginPage.vue";
import LayoutPage from "../pages/layout/index.vue";
import Home from "../pages/Home.vue";
import SendMessage from "../pages/NotificationPages/SendMessage.vue";
import Outbox from "../pages/NotificationPages/Outbox.vue";
import Inbox from "../pages/NotificationPages/Inbox.vue";
import ResourcePage from "../pages/ResourcePages/index.vue"
import MembersInfoPage from "../pages/MembersPages/MembersInfoPage.vue";
import RecruitmentListPage from "../pages/RecruitmentPages/RecruitmentListPage.vue";


const routes: Array<RouteRecordRaw> = [
    { path: "/login", component: LoginPage },
    { path: "/reset", component: ResetPwd },
    {
        path: "/layout",
        component: LayoutPage,
        children: [
            {
                path: "/layout/home",
                component: Home,
            },
            {
                path: "/layout/notification",
                children: [
                    {
                        path: "/layout/notification/sendmessage",
                        component: SendMessage,
                    },
                    {
                        path: "/layout/notification/outbox",
                        component: Outbox,
                    },
                    {
                        path: "/layout/notification/inbox",
                        component: Inbox,
                    },
                ],
            },
            {
                path: "/layout/resource",
                component: ResourcePage
            },
            {
                path: "/layout/member",
                children: [
                    {
                        path: "/layout/member/info",
                        component: MembersInfoPage
                    }
                ]
            },
            {
                path: "/layout/recruitment",
                children: [
                    {
                        path: "/layout/recruitment/list",
                        component: RecruitmentListPage
                    }
                ]
            }
        ],
    },
    // { path: '/about', component: About },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
