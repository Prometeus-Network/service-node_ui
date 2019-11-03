import * as React from "react";
import {Grid, Hidden} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {NavigationMenu} from "../NavigationMenu";
import {Layout} from "../Layout";
import {SettingsCard} from "../Settings";

export const SettingsPage: React.FC<any> = () => (
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
                <SettingsCard/>
            </Layout>
        </Grid>
    </Grid>
);
