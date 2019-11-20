import * as React from "react";
import {inject, observer} from "mobx-react";
import {Grid, Hidden, Typography} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {Layout} from "../Layout";
import {UploadDataForm} from "../DataUpload";
import {DataValidatorNavigationMenu} from "../Navigation";
import {Footer} from "../Footer";
import {Routes} from "../router";
import {IAppState} from "../store";

const {Link} = require("mobx-router");

interface DataUploadPageMobxProps {
    selectedServiceNodeAccount: string | undefined,
    selectedDataValidatorAccount: string | undefined,
    store?: any
}

const _DataUploadPage: React.FC<DataUploadPageMobxProps> = ({selectedDataValidatorAccount, selectedServiceNodeAccount, store}) => {
    let content: React.ReactNode;

    if (!selectedDataValidatorAccount && !selectedServiceNodeAccount) {
        content = (
            <Typography variant="body1">
                Looks like you haven't selected neither data validator account nor service node account.
                You can select them in <Link view={Routes.dataValidatorHome} store={store}>data validator home page</Link>
                and <Link view={Routes.serviceNodeHome}>service node home page</Link>.
            </Typography>
        );
    } else if (!selectedDataValidatorAccount) {
        content = (
            <Typography variant="body1">
                Looks like you haven't selected data validator account.
                You can select it in <Link view={Routes.dataValidatorHome} store={store}>data validator home page</Link>.
            </Typography>
        );
    } else if (!selectedServiceNodeAccount) {
        content = (
            <Typography variant="body1">
                Looks like you haven't selected service node account.
                You can select it in <Link view={Routes.serviceNodeHome} store={store}>service node home page</Link>.
            </Typography>
        )
    } else {
        content = <UploadDataForm/>
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <AppBar/>
            </Grid>
            <Hidden mdDown>
                <Grid item lg={2}>
                    <DataValidatorNavigationMenu/>
                </Grid>
            </Hidden>
            <Grid item xs={12} lg={10}>
                <Layout>
                    {content}
                </Layout>
            </Grid>
            <Grid item xs={12}>
                <Footer/>
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = (state: IAppState): DataUploadPageMobxProps => ({
    store: state.store,
    selectedServiceNodeAccount: state.settings.selectedServiceNodeAccount,
    selectedDataValidatorAccount: state.settings.selectedDataValidatorAccount
});

export const DataUploadPage = inject(mapMobxToProps)(observer(_DataUploadPage)) as React.FC<any>;
