import React, {FunctionComponent} from "react";
import {Grid, Hidden} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {Layout} from "../Layout";
import {Footer} from "../Footer";
import {ServiceNodeNavigationMenu} from "../Navigation";
import {ServiceNodeAccountSettings} from "../Settings";
import {SelectedServiceNodeBalance} from "../Account";

export const ServiceNodeHomePage: FunctionComponent<{}> = () => (
    <Grid container>
        <Grid item xs={12}>
            <AppBar sideBarItem={<SelectedServiceNodeBalance/>}/>
        </Grid>
        <Hidden mdDown>
            <Grid item lg={2}>
                <ServiceNodeNavigationMenu/>
            </Grid>
        </Hidden>
        <Grid item xs={12} lg={10}>
            <Layout>
                <ServiceNodeAccountSettings/>
            </Layout>
        </Grid>
        <Grid item xs={12}>
            <Footer/>
        </Grid>
    </Grid>
);
