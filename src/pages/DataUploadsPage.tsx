import React, {FunctionComponent} from "react";
import {Grid, Hidden} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {Layout} from "../Layout";
import {SelectedServiceNodeBalance} from "../Account";
import {NavigationMenu} from "../Navigation";
import {Footer} from "../Footer";
import {DataUploadsTransactionsCard} from "../Transaction";

export const DataUploadsPage: FunctionComponent = () => (
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
                <DataUploadsTransactionsCard/>
            </Layout>
        </Grid>
        <Grid item xs={12}>
            <Footer/>
        </Grid>
    </Grid>
);
