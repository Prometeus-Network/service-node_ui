import * as React from "react";
import {Grid, Typography} from "@material-ui/core";
import {AccountCard} from "./AccountCard";
import {AccountBalanceMapping, AccountResponse, AccountType} from "../../models";

interface DataValidatorAccountsListProps {
    accounts: AccountResponse[],
    balances: AccountBalanceMapping,
    defaultAccount?: string,
    onDefaultAccountSelected: (address: string) => void
}

export const DataValidatorAccountsList: React.FC<DataValidatorAccountsListProps> = ({
    balances,
    accounts,
    defaultAccount,
    onDefaultAccountSelected
}) => (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="subtitle1">
                Data validator accounts
            </Typography>
        </Grid>
        {accounts.map(account => (
            <Grid item xs={12}>
                <AccountCard selectedAsDefault={account.address === defaultAccount}
                             onSelect={onDefaultAccountSelected}
                             address={account.address}
                             balance={balances[account.address]}
                             type={AccountType.DATA_VALIDATOR}
                />
            </Grid>
        ))}
    </Grid>
);
