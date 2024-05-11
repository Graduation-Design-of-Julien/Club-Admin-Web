import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import ResetPwd from "../pages/ResetPwd.vue";
import LoginPage from "../pages/LoginPage.vue";
import LayoutPage from "../pages/layout/index.vue";
import Home from "../pages/Home.vue";
import Outbox from "../pages/NotificationPages/Outbox.vue";
import Inbox from "../pages/NotificationPages/Inbox.vue";
import ResourcePage from "../pages/ResourcePages/ResourcePage.vue";
import MembersInfoPage from "../pages/MembersPages/MembersInfoPage.vue";
import RecruitmentListPage from "../pages/RecruitmentPages/RecruitmentListPage.vue";
import { useLocalStorage } from "../utils/useLocalStorage";
import NxForm from "../pages/RecruitmentPages/NxForm.vue";
import ResourceTypePage from "../pages/ResourcePages/ResourceTypePage.vue";
import ResourceBorrowPage from "../pages/ResourcePages/ResourceBorrowPage.vue";
import ApplicationListPahe from "../pages/RecruitmentPages/ApplicationListPahe.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        meta: { title: "登录" },
        component: LoginPage,
    },
    {
        path: "/reset",
        meta: { title: "找回密码" },
        component: ResetPwd,
    },
    {
        path: "/nxForm",
        meta: { title: "纳新报名" },
        component: NxForm,
    },
    {
        path: "/layout",
        component: LayoutPage,
        children: [
            {
                path: "/layout/home",
                meta: { title: "主页" },
                component: Home,
            },
            {
                path: "/layout/notification",
                children: [
                    {
                        path: "/layout/notification/outbox",
                        meta: { title: "发件箱" },
                        component: Outbox,
                    },
                    {
                        path: "/layout/notification/inbox",
                        meta: { title: "收件箱" },
                        component: Inbox,
                    },
                ],
            },
            {
                path: "/layout/resource",
                meta: { title: "物资管理" },
                children: [
                    {
                        path: "/layout/resource/type",
                        meta: { title: "物资类型" },
                        component: ResourceTypePage,
                    },
                    {
                        path: "/layout/resource/list",
                        meta: { title: "物资管理" },
                        component: ResourcePage,
                    },
                    {
                        path: "/layout/resource/myborrow",
                        meta: { title: "我的借用" },
                        component: ResourceBorrowPage,
                    },
                ],
            },
            {
                path: "/layout/member",
                children: [
                    {
                        path: "/layout/member/info",
                        meta: { title: "人员管理" },
                        component: MembersInfoPage,
                    },
                ],
            },
            {
                path: "/layout/recruitment",
                children: [
                    {
                        path: "/layout/recruitment/list",
                        meta: { title: "纳新管理" },
                        component: RecruitmentListPage,
                    },
                    {
                        path: "/layout/recruitment/application",
                        meta: { title: "纳新管理" },
                        component: ApplicationListPahe,
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const storageHelper = useLocalStorage();

// 重定向到登录
export const redirectToLogin = async () => {
    storageHelper.removeLocalStorage("token");
    await router.replace("/login");
};

const BASE_TITLE = "社团管理系统";
router.beforeEach(async (to, from, next) => {
    const token = storageHelper.getLocalStorage("token");
    if (to.path == "/login" || to.path == "/reset" || to.path == "nxForm") {
        next();
    } else {
        if (!token) {
            if (to.path == "/") {
                router.replace("/login");
            } else {
                ElMessage({
                    type: "error",
                    message: "未登录，请登录后再试。",
                });
                router.replace("/login");
            }
        } else {
            if (to.path == "/") {
                router.replace("/layout/home");
            } else {
                next();
            }
        }
    }
});

router.afterEach((to, from) => {
    if (to.meta.title) {
        // 设置标题
        document.title = `${to.meta.title} · ${BASE_TITLE}`;
    } else {
        document.title = BASE_TITLE;
    }
});

export default router;
