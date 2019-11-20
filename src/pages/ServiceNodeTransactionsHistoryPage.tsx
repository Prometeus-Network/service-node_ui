import React, {FunctionComponent} from "react";
import {Grid, Hidden, Typography} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {Layout} from "../Layout";
import {Footer} from "../Footer";
import {ServiceNodeNavigationMenu} from "../Navigation";

export const ServiceNodeTransactionsHistoryPage: FunctionComponent<{}> = () => (
    <Grid container>
        <Grid item xs={12}>
            <AppBar/>
        </Grid>
        <Hidden mdDown>
            <Grid item lg={2}>
                <ServiceNodeNavigationMenu/>
            </Grid>
        </Hidden>
        <Grid item xs={12} lg={10}>
            <Layout>
                <Typography variant="body1">
                    This functionality is yet to be implemented
                </Typography>
            </Layout>
        </Grid>
        <Grid item xs={12}>
            <Footer/>
        </Grid>
    </Grid>
)
