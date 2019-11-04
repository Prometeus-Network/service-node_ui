import * as React from "react";
import {observer, inject} from "mobx-react";
import {Card, CardHeader, CardContent, CircularProgress, Typography, Grid} from "@material-ui/core";
import {DataValidatorAccountSelect} from "./DataValidatorAccountSelect";
import {ServiceNodeAccountSelect} from "./ServiceNodeAccountSelect";
import {ApiError} from "../../api";
import {IAppState} from "../../store";

interface SettingsCardProps {
    fetchingAccounts: boolean,
    fetchingAccountsError?: ApiError
}

const _SettingsCard: React.FC<SettingsCardProps> = ({
    fetchingAccounts,
    fetchingAccountsError
}) => {
    let content: React.ReactNode;

    if (fetchingAccounts) {
        content = <CircularProgress size={50} style={{marginLeft: 'calc(50% - 25)px'}} color="primary"/>;
    } else if (fetchingAccountsError) {
        content = <Typography variant="body1">Error occurred when tried to fetch registered accounts.</Typography>
    } else {
        content = (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <ServiceNodeAccountSelect/>
                </Grid>
                <Grid item xs={12}>
                    <DataValidatorAccountSelect/>
                </Grid>
            </Grid>
        )
    }

    return (
        <Card>
            <CardHeader title="Settings">
                Settings
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
        </Card>
    )
};

const mapMobxToProps = (state: IAppState): SettingsCardProps => ({
    fetchingAccountsError: state.settings.fetchingAccountsError,
    fetchingAccounts: state.settings.fetchingAccounts
});

export const SettingsCard = inject(mapMobxToProps)(observer(_SettingsCard)) as React.FC<any>;
