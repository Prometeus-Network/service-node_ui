import React, {FunctionComponent} from "react";
import {Grid, Hidden} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {NavigationMenu} from "../Navigation";
import {
    AccountRegistrationDialog,
    AccountsTable,
    OpenAccountRegistrationDialogButton,
    SelectedServiceNodeBalance
} from "../Account";
import {Layout} from "../Layout";
import {Footer} from "../Footer";

export const WalletsPage: FunctionComponent = () => (
    <Grid container>
        <Grid item xs={12}>
            <AppBar sideBarItem={<SelectedServiceNodeBalance/>}/>
        </Grid>
        <Hidden mdDown>
            <Grid item lg={2}>
                <NavigationMenu/>
            </Grid>
        </Hidden>
        <Grid item xs={12} lg={10}>
            <Layout>
                <Grid container>
                    <Grid item xs={12}>
                        <OpenAccountRegistrationDialogButton/>
                    </Grid>
                    <Grid item xs={12}>
                        <AccountsTable/>
                    </Grid>
                    <AccountRegistrationDialog/>
                </Grid>
            </Layout>
        </Grid>
        <Grid item xs={12}>
            <Footer/>
        </Grid>
    </Grid>
);
