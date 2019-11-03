import * as React from "react";
import {Grid, Hidden} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {Layout} from "../Layout";
import {UploadDataForm} from "../DataUpload";
import {NavigationMenu} from "../NavigationMenu/components";

export const DataUploadPage: React.FC = () => (
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
                <UploadDataForm/>
            </Layout>
        </Grid>
    </Grid>
);
