import * as React from "react";
import {inject, observer} from "mobx-react";
import {Typography} from "@material-ui/core";
import {AccountSelect} from "./AccountSelect";
import {Routes} from "../../router";
import {AccountResponse} from "../../models";
import {IAppState} from "../../store";

const {Link} = require("mobx-router");

interface ServiceNodeAccountSelectMobxProps {
    store?: any,
    selectedAccount?: string,
    selectAccount: (account: string) => void,
    accounts: AccountResponse[],
}

const _ServiceNodeAccountSelect: React.FC<ServiceNodeAccountSelectMobxProps> = ({
    accounts,
    selectedAccount,
    store,
    selectAccount
}) => {
    if (accounts.length === 0) {
        return (
            <Typography variant="body1">
                Looks like you don't have any registered service node accounts. You must <Link store={store} view={Routes.registration}>register</Link> it.
            </Typography>
        )
    }

    return <AccountSelect accounts={accounts.map(account => account.address)}
                          onSelect={selectAccount}
                          selectedValue={selectedAccount}
                          label="Service node account"
    />
};

const mapMobxToProps = (state: IAppState): ServiceNodeAccountSelectMobxProps => ({
    accounts: state.settings.serviceNodeAccounts,
    selectAccount: state.settings.selectServiceNodeAccount,
    selectedAccount: state.settings.selectedServiceNodeAccount,
    store: state.store
});

export const ServiceNodeAccountSelect = inject(mapMobxToProps)(observer(_ServiceNodeAccountSelect)) as React.FC<any>;
