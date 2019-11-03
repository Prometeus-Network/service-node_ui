import * as React from "react";
import {Select, MenuItem, InputLabel} from "@material-ui/core";

interface AccountSelectProps {
    accounts: string[],
    onSelect: (account: string) => void,
    selectedValue?: string,
    label: string
}

export const AccountSelect: React.FC<AccountSelectProps> = ({
    accounts,
    selectedValue,
    onSelect,
    label
}) => (
    <React.Fragment>
        <InputLabel>
            {label}
        </InputLabel>
        <Select value={selectedValue || ""}
                onChange={event => onSelect(event.target.value as string)}
                style={{width: '100%'}}
        >
            {accounts.map(account => (
                <MenuItem key={account}
                          value={account}
                >
                    {account}
                </MenuItem>
            ))}
        </Select>
    </React.Fragment>
);
