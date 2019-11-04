import * as React from "react";
import {Grid, Hidden, Typography} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {Layout} from "../Layout";
import {NavigationMenu} from "../NavigationMenu";

export const HomePage: React.FC = () => (
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
                <Typography variant="h4">
                    Welcome to Service node v. 0.1.0!
                </Typography>
                <p>
                    <Typography variant="body1">
                        Service node is an application which will act as an intermediate layer between data validators, data buyers and data marts. Service node uses modified ethereum protocol under the hood. It will store encrypted data in a distributed data storage, and metadata in ethereum blockchain.
                    </Typography>
                </p>
                <p>
                    <Typography variant="body1">
                        Service node exposes API for uploading data, which is used by data validator. It will will also expose API for purchasing data, which will be used by data mart.
                    </Typography>
                </p>
            </Layout>
        </Grid>
    </Grid>
);