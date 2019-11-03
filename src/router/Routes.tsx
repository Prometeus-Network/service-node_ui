import * as React from "react";
import {
    HomePage,
    NotFoundPage,
    DataUploadPage,
    RegistrationPage,
    SettingsPage
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
    dataUpload: new Route({
        path: '/data-upload',
        component: <DataUploadPage/>
    }),
    registration: new Route({
        path: '/registration',
        component: <RegistrationPage/>
    }),
    settings: new  Route({
        path: '/settings',
        component: <SettingsPage/>,
        beforeEnter: () => {
            store.settings.fetchAccounts();
        }
    })
};
