import * as React from "react";
import {inject, observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import {DataValidatorAccountsList} from "../../Account";
import {AccountBalanceMapping, AccountResponse} from "../../models";
import {IAppState} from "../../store";

interface DataValidatorAccountSettingsMobxProps {
    accounts: AccountResponse[],
    balances: AccountBalanceMapping,
    dataOwners: {[dataValidatorAddress: string]: string[]}
    selectedAccount?: string,
    selectAccount: (address: string) => void
}

const _DataValidatorAccountSettings: React.FC<DataValidatorAccountSettingsMobxProps> = ({
    balances,
    accounts,
    selectedAccount,
    selectAccount,
    dataOwners
}) => (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <DataValidatorAccountsList accounts={accounts}
                                       balances={balances}
                                       defaultAccount={selectedAccount}
                                       onDefaultAccountSelected={selectAccount}
                                       dataOwners={dataOwners}
            />
        </Grid>
    </Grid>
);

const mapMobxToProps = (state: IAppState): DataValidatorAccountSettingsMobxProps => ({
    selectAccount: state.settings.selectDataValidatorAccount,
    selectedAccount: state.settings.selectedDataValidatorAccount,
    balances: state.balances.accountsBalances,
    accounts: state.accounts.dataValidatorAccounts,
    dataOwners: state.dataOwners.dataOwners
});

export const DataValidatorAccountSettings = inject(mapMobxToProps)(observer(_DataValidatorAccountSettings)) as React.FC<any>;
