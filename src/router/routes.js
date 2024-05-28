const routes = [
  {
    path: "/auth",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        meta: {
          requiresAuth: false,
        },
        component: () => import("pages/auth/LoginIndex.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "login-redirection",
        meta: {
          requiresAuth: false,
        },
        component: () => import("pages/RedirectionPage.vue"),
      },
    ],
  },
  {
    path: "/",
    meta: {
      requiresAuth: true,
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        meta: {
          requiresAuth: true,
        },
        component: () => import("pages/dashboard/DashboardIndex.vue"),
      },
      {
        path: "alumni",
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            name: "alumni",
            path: "",
            component: () => import("pages/alumni/AlumniIndex.vue"),
          },
          {
            name: "alumni-create",
            path: "create",
            component: () => import("pages/alumni/AlumniCreateUpdate.vue"),
          },
          {
            name: "alumni-update",
            path: "update/:id",
            component: () => import("pages/alumni/AlumniCreateUpdate.vue"),
          },
        ],
      },
      {
        path: "reports",
        name: "reports",
        meta: {
          requiresAuth: true,
        },
        component: () => import("pages/reports/ReportsIndex.vue"),
      },
      {
        path: "settings",
        name: "settings",
        meta: {
          requiresAuth: true,
        },
        component: () => import("pages/settings/SettingsIndex.vue"),
      },
      {
        path: "notifications",
        name: "notifications",
        meta: {
          requiresAuth: true,
        },
        component: () => import("pages/notifications/NotificationsIndex.vue"),
      },
      {
        path: "message",
        name: "message",
        meta: {
          requiresAuth: true,
        },
        component: () => import("pages/message/MessageIndex.vue"),
      },
    ],
  },
  
  
  {
    path: "/pages",
    meta: {
      requiresAuth: false,
    },
    component: () => import("layouts/PublicLayout.vue"),
    children: [
      {
        path: "home",
        name: "home-page",
        component: () => import("pages/public/HomePage.vue")
      },
      {
        path: "events",
        name: "events-page",
        component: () => import("pages/public/EventsPage.vue")
      },
      {
        path: "about",
        name: "about-page",
        component: () => import("pages/public/AboutPage.vue")
      },
      {
        path: "contact",
        name: "contact-page",
        component: () => import("pages/public/ContactPage.vue")
      },
      {
        path: "sign-in",
        name: "sign-in-page",
        component: () => import("pages/public/SignInPage.vue")
      }
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
