import * as React from "react";
import {
    HomePage,
    NotFoundPage,
    ServiceNodeTransactionsHistoryPage,
    WalletsPage,
    DataPurchasesPage,
    DataUploadsPage,
} from "../pages";
import {store} from "../store";

const Route = require("mobx-router").Route;

export const Routes = {
    home: new Route({
        path: '/',
        component: <ServiceNodeTransactionsHistoryPage/>,
        beforeEnter: () => {
            store.serviceNodeTransactions.setResetOnSelectedServiceNodeAccountChange(true);
            store.serviceNodeTransactions.fetchTransactions()
        },
        onExit: () => {
            store.serviceNodeTransactions.setResetOnSelectedServiceNodeAccountChange(false);
            store.serviceNodeTransactions.reset();
        }
    }),
    wallets: new Route({
        path: "/wallets",
        component: <WalletsPage/>
    }),
    notFound: new Route({
        path: '/404',
        component: <NotFoundPage/>
    }),
    dataUploads: new Route({
        path: '/data-uploads',
        component: <DataUploadsPage/>,
        beforeEnter: () => {
            store.dataUploads.fetchDataUploadsHistory();
            store.dataUploads.setResetOnSelectedServiceNodeAccountChange(true);
        },
        onExit: () => {
            store.dataUploads.setResetOnSelectedServiceNodeAccountChange(false);
            store.dataUploads.reset();
        }
    }),
    dataPurchases: new Route({
        path: '/data-purchases',
        component: <DataPurchasesPage/>,
        beforeEnter: () => {
            store.dataPurchases.fetchPurchasesHistory();
            store.dataPurchases.setResetOnSelectedServiceNodeAccountChange(true);
        },
        onExit: () => {
            store.dataPurchases.setResetOnSelectedServiceNodeAccountChange(false);
            store.dataPurchases.reset();
        }
    })
};
