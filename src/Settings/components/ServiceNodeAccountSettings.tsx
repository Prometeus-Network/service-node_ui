import * as React from "react";
import {inject, observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import {ServiceNodeAccountsList} from "../../Account";
import {AccountBalanceMapping, AccountResponse} from "../../models";
import {IAppState} from "../../store";

interface ServiceNodeAccountSettingsMobxProps {
    accounts: AccountResponse[],
    balances: AccountBalanceMapping,
    selectedAccount?: string,
    selectAccount: (address: string) => void
}

const _ServiceNodeAccountSettings: React.FC<ServiceNodeAccountSettingsMobxProps> = ({
    selectedAccount,
    accounts,
    balances,
    selectAccount
}) => (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <ServiceNodeAccountsList accounts={accounts}
                                     balances={balances}
                                     defaultAccount={selectedAccount}
                                     onDefaultAccountSelected={selectAccount}
            />
        </Grid>
    </Grid>
);

const mapMobxToProps = (state: IAppState): ServiceNodeAccountSettingsMobxProps => ({
    accounts: state.accounts.serviceNodeAccounts,
    balances: state.balances.accountsBalances,
    selectedAccount: state.settings.selectedServiceNodeAccount,
    selectAccount: state.settings.selectServiceNodeAccount
});

export const ServiceNodeAccountSettings = inject(mapMobxToProps)(observer(_ServiceNodeAccountSettings)) as React.FC<any>;
