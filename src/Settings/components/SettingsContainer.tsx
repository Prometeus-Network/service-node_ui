import * as React from "react";
import {Typography, Grid} from "@material-ui/core"
import {DataValidatorAccountSettings} from "./DataValidatorAccountSettings";
import {ServiceNodeAccountSettings} from "./ServiceNodeAccountSettings";

export const SettingsContainer: React.FC<{}> = () => (
    <Grid container spacing={1}>
        <Grid item xs={12}>
            <Typography variant="h6">
                Settings
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <DataValidatorAccountSettings/>
        </Grid>
        <Grid item xs={12}>
            <ServiceNodeAccountSettings/>
        </Grid>
    </Grid>
);
