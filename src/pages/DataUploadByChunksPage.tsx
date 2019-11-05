import * as React from "react";
import {inject, observer} from "mobx-react";
import {Grid, Hidden, Typography} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {Layout} from "../Layout";
import {UploadDataByChunksForm} from "../DataUpload";
import {NavigationMenu} from "../NavigationMenu";
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
        You can select them in <Link view={Routes.settings} store={store}>settings</Link>.
            </Typography>
    );
    } else if (!selectedDataValidatorAccount) {
        content = (
            <Typography variant="body1">
                Looks like you haven't selected data validator account.
        You can select it in <Link view={Routes.settings} store={store}>settings</Link>.
            </Typography>
    );
    } else if (!selectedServiceNodeAccount) {
        content = (
            <Typography variant="body1">
                Looks like you haven't selected service node account.
        You can select it in <Link view={Routes.settings} store={store}>settings</Link>.
            </Typography>
    )
    } else {
        content = <UploadDataByChunksForm/>
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <AppBar/>
            </Grid>
            <Hidden smDown>
                <Grid item lg={2}>
                    <NavigationMenu/>
                </Grid>
            </Hidden>
            <Grid item xs={12} lg={10}>
                <Layout>
                    {content}
                </Layout>
            </Grid>
        </Grid>
);
};

const mapMobxToProps = (state: IAppState): DataUploadPageMobxProps => ({
    store: state.store,
    selectedServiceNodeAccount: state.settings.selectedServiceNodeAccount,
    selectedDataValidatorAccount: state.settings.selectedDataValidatorAccount
});

export const DataUploadByChunksPage = inject(mapMobxToProps)(observer(_DataUploadPage)) as React.FC<any>;
