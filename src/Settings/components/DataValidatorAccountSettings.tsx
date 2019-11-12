import * as React from "react";
import {inject, observer} from "mobx-react";
import {Typography, Grid} from "@material-ui/core";
import {DataValidatorAccountsList} from "../../Account";
import {AccountBalanceMapping, AccountResponse} from "../../models";
import {IAppState} from "../../store";

interface DataValidatorAccountSettingsMobxProps {
    accounts: AccountResponse[],
    balances: AccountBalanceMapping,
    selectedAccount?: string,
    selectAccount: (address: string) => void
}

const _DataValidatorAccountSettings: React.FC<DataValidatorAccountSettingsMobxProps> = ({
    balances,
    accounts,
    selectedAccount,
    selectAccount
}) => (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <DataValidatorAccountsList accounts={accounts}
                                       balances={balances}
                                       defaultAccount={selectedAccount}
                                       onDefaultAccountSelected={selectAccount}
            />
        </Grid>
    </Grid>
);

const mapMobxToProps = (state: IAppState): DataValidatorAccountSettingsMobxProps => ({
    selectAccount: state.settings.selectDataValidatorAccount,
    selectedAccount: state.settings.selectedDataValidatorAccount,
    balances: state.balances.accountsBalances,
    accounts: state.accounts.dataValidatorAccounts
});

export const DataValidatorAccountSettings = inject(mapMobxToProps)(observer(_DataValidatorAccountSettings)) as React.FC<any>;
