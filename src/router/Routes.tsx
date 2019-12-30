import * as React from "react";
import {
    DataPurchasesPage,
    DataUploadsPage,
    HomePage,
    NotFoundPage,
    ServiceNodeRegistrationPage,
    ServiceNodeTransactionsHistoryPage
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
    serviceNodeRegistration: new Route({
        path: '/registration',
        component: <ServiceNodeRegistrationPage/>
    }),
    dataUploads: new Route({
        path: '/data-uploads',
        component: <DataUploadsPage/>,
        beforeEnter: () => {
            store.dataUploads.fetchDataUploadsHistory();
            store.dataUploads.setResetOnSelectedServiceNodeAccountChange(true)
        },
        onExit: () => {
            store.dataUploads.setResetOnSelectedServiceNodeAccountChange(false)
        }
    }),
    dataPurchases: new Route({
        path: '/data-purchases',
        component: <DataPurchasesPage/>,
        beforeEnter: () => {
            store.dataPurchases.fetchPurchasesHistory();
            store.dataPurchases.setResetOnSelectedServiceNodeAccountChange(true)
        },
        onExit: () => {
            store.dataPurchases.setResetOnSelectedServiceNodeAccountChange(false)
        }
    })
};
