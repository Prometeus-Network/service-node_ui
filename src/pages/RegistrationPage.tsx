import * as React from "react";
import {Grid, Hidden} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {NavigationMenu} from "../NavigationMenu";
import {AccountRegistrationForm} from "../Account";
import {Layout} from "../Layout";

export const RegistrationPage: React.FC<any> = () => (
    <Grid container spacing={1}>
        <Grid item xs={12}>
            <AppBar/>
        </Grid>
        <Hidden mdDown>
            <Grid item lg={2}>
                <NavigationMenu/>
            </Grid>
        </Hidden>
        <Grid item xs={12} lg={10}>
            <Layout>
                <AccountRegistrationForm/>
            </Layout>
        </Grid>
    </Grid>
);
