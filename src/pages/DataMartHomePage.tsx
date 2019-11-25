import React, {FunctionComponent} from "react";
import {Grid, Hidden} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {Layout} from "../Layout";
import {Footer} from "../Footer";
import {DataMartNavigationMenu} from "../Navigation";
import {DataMartAccountSettings} from "../Settings";
import {SelectedDataMartBalance} from "../Account";

export const DataMartHomePage: FunctionComponent<{}> = () => (
    <Grid container>
        <Grid item xs={12}>
            <AppBar sideBarItem={<SelectedDataMartBalance/>}/>
        </Grid>
        <Hidden mdDown>
            <Grid item lg={2}>
                <DataMartNavigationMenu/>
            </Grid>
        </Hidden>
        <Grid item xs={12} lg={10}>
            <Layout>
                <DataMartAccountSettings/>
            </Layout>
        </Grid>
        <Grid item xs={12}>
            <Footer/>
        </Grid>
    </Grid>
);
