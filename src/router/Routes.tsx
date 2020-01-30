import * as React from "react";
import {
    HomePage,
    NotFoundPage,
    ServiceNodeTransactionsHistoryPage,
    WalletsPage
} from "../pages";
import {store} from "../store";

const Route = require("mobx-router").Route;

export const Routes = {
    home: new Route({
        path: '/',
        component: <HomePage/>
    }),
    notFound: new Route({
        path: '/404',
        component: <NotFoundPage/>
    }),
    serviceNodeTransactions: new Route({
        path: '/transactions',
        component: <ServiceNodeTransactionsHistoryPage/>,
        beforeEnter: () => {
            store.serviceNodeTransactions.fetchTransactions()
        },
        onExit: () => {
            store.serviceNodeTransactions.reset()
        }
    }),
    wallets: new Route({
        path: "/wallets",
        component: <WalletsPage/>
    })
};
