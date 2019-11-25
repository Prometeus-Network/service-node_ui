import React, {FunctionComponent} from "react";
import {Grid, Hidden} from "@material-ui/core";
import {AllFilesList} from "../DataPurchase";
import {AppBar} from "../AppBar";
import {Layout} from "../Layout";
import {DataMartNavigationMenu} from "../Navigation";
import {Footer} from "../Footer";

export const FilesPage: FunctionComponent<{}> = () => (
    <Grid container>
        <Grid item xs={12}>
            <AppBar/>
        </Grid>
        <Hidden mdDown>
            <Grid item lg={2}>
                <DataMartNavigationMenu/>
            </Grid>
        </Hidden>
        <Grid item xs={12} lg={10}>
            <Layout>
                <AllFilesList/>
            </Layout>
        </Grid>
        <Grid item xs={12}>
            <Footer/>
        </Grid>
    </Grid>
);
