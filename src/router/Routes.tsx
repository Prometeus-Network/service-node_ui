import * as React from "react";
import {
    DataMartRegistrationPage,
    DataUploadPage,
    DataValidatorHomePage,
    DataValidatorRegistrationPage,
    FilesPage,
    HomePage,
    NotFoundPage,
    ServiceNodeHomePage,
    ServiceNodeRegistrationPage,
    ServiceNodeTransactionsHistoryPage
} from "../pages";

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
    dataValidatorHome: new Route({
       path: '/data-validator',
       component: <DataValidatorHomePage/>
    }),
    dataUpload: new Route({
        path: '/data-validator/data-upload',
        component: <DataUploadPage/>
    }),
    registration: new Route({
        path: '/data-validator/registration',
        component: <DataValidatorRegistrationPage/>
    }),
    files: new Route({
        path: '/data-mart/files',
        component: <FilesPage/>
    }),
    serviceNodeHome: new Route({
        path: '/service-node',
        component: <ServiceNodeHomePage/>
    }),
    serviceNodeTransactions: new Route({
        path: '/service-node/transactions',
        component: <ServiceNodeTransactionsHistoryPage/>
    }),
    serviceNodeRegistration: new Route({
        path: '/service-node/registration',
        component: <ServiceNodeRegistrationPage/>
    }),
    dataMartRegistration: new Route({
        path: '/data-mart/registration',
        component: <DataMartRegistrationPage/>
    })
};
