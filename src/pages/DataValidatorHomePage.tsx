import React, {FunctionComponent} from "react";
import {Grid, Hidden} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {Layout} from "../Layout";
import {DataValidatorNavigationMenu} from "../NavigationMenu";
import {Footer} from "../Footer";
import {DataValidatorAccountSettings} from "../Settings";

export const DataValidatorHomePage: FunctionComponent<{}> = () => (
    <Grid container>
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
                <DataValidatorAccountSettings/>
            </Layout>
        </Grid>
        <Grid item xs={12}>
            <Footer/>
        </Grid>
    </Grid>
);
