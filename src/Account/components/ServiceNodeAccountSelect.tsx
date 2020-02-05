import React, {FunctionComponent, Fragment} from "react";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import uuid from "uuid/v4";

interface ServiceNodeAccountSelectProps {
    accounts: string[],
    onSelect: (account: string) => void,
    selectedAccount?: string,
    id?: string
}

export const ServiceNodeAccountSelect: FunctionComponent<ServiceNodeAccountSelectProps> = ({
    accounts,
    onSelect,
    selectedAccount,
    id = `serviceNodeAccountSelect-${uuid()}`
}) => (
    <Fragment>
        <InputLabel htmlFor={id}>
            Wallet
        </InputLabel>
        <Select onChange={event => onSelect(event.target.value as string)}
                value={selectedAccount || ""}
        >
            {accounts.map(account => (
                <MenuItem key={account}
                          value={account}
                >
                    {account}
                </MenuItem>
            ))}
        </Select>
    </Fragment>
);
