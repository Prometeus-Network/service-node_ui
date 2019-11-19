import * as React from "react";
import {
    HomePage,
    NotFoundPage,
    DataUploadPage,
    RegistrationPage,
    SettingsPage,
    FilesPage, DataValidatorHomePage
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
        component: <RegistrationPage/>
    }),
    settings: new Route({
        path: '/data-validator/settings',
        component: <SettingsPage/>
    }),
    files: new Route({
        path: '/data-mart/files',
        component: <FilesPage/>
    })
};
