import * as React from "react";
import {
    Grid,
    Typography
} from "@material-ui/core";
import {AppBar} from "../AppBar";
import {Layout} from "../Layout";

export const NotFoundPage: React.FC<any> = () => (
    <Grid container spacing={1}>
        <Grid item xs={12}>
            <AppBar/>
        </Grid>
        <Grid item xs={12}>
            <Layout>
                <Typography variant="h4">
                    The page you requested was not found :(
                </Typography>
            </Layout>
        </Grid>
    </Grid>
);
