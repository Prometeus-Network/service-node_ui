import React, {FunctionComponent} from "react";
import {Typography, Grid, Hidden} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {Layout} from "../Layout";
import {DataMartNavigationMenu} from "../NavigationMenu";
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
                <Typography variant="body1">
                    This functionality is yet to be implemented
                </Typography>
            </Layout>
        </Grid>
        <Grid item xs={12}>
            <Footer/>
        </Grid>
    </Grid>
);
