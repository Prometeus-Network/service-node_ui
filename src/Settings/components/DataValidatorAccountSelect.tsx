import * as React from "react";
import {inject, observer} from "mobx-react";
import {Typography} from "@material-ui/core";
import {withSnackbar, WithSnackbarProps} from "notistack";
import {AccountSelect} from "./AccountSelect";
import {Routes} from "../../router";
import {AccountResponse} from "../../models";
import {IAppState} from "../../store";

const {Link} = require("mobx-router");

interface DataValidatorAccountSelectMobxProps {
    store?: any,
    selectedAccount?: string,
    selectAccount: (account: string) => void,
    accounts: AccountResponse[]
}

type DataValidatorAccountSelectInjectedProps = WithSnackbarProps;

type DataValidatorAccountSelectProps = DataValidatorAccountSelectMobxProps & DataValidatorAccountSelectInjectedProps;

const _DataValidatorAccountSelect: React.FC<DataValidatorAccountSelectProps> = ({
    store,
    selectAccount,
    selectedAccount,
    accounts,
    enqueueSnackbar
}) => {
    const handleSelect = (selectedAccount: string) => {
        selectAccount(selectedAccount);
        enqueueSnackbar("Data validator account has been updated");
    };

    if (accounts.length === 0) {
        return (
            <Typography variant="body1">
                Looks like you don't have any registered data validator accounts. You must <Link store={store} view={Routes.registration}>register</Link> it.
            </Typography>
        )
    }

    return <AccountSelect accounts={accounts.map(account => account.address)}
                          onSelect={handleSelect}
                          selectedValue={selectedAccount}
                          label="Data validator account"
    />
};

const mapMobxToProps = (state: IAppState): DataValidatorAccountSelectMobxProps => ({
    selectedAccount: state.settings.selectedDataValidatorAccount,
    accounts: state.settings.dataValidatorAccounts,
    selectAccount: state.settings.selectDataValidatorAccount,
    store: state.store
});

export const DataValidatorAccountSelect = withSnackbar(
    inject(mapMobxToProps)(observer(_DataValidatorAccountSelect)) as React.FC<any>
);
