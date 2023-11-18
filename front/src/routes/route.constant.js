//TODO name replace with translate

const offlineRoutes = [
    {
        href: "/scoreboard",
        name: "scoreboard",
        isLoggedIn: false,
        roles: []
    },
]

const onlineRoutes = [
    {
        href: "/profile",
        name: "profile",
        isLoggedIn: true,
        roles: []
    },
    {
        href: "/scoreboard",
        name: "scoreboard",
        isLoggedIn: true,
        roles: []
    }
]


export const routes = [
    ...onlineRoutes,
    ...offlineRoutes,
]