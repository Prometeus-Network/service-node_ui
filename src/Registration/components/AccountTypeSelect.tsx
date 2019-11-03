import * as React from "react";
import {InputLabel, MenuItem, Select, Tooltip} from "@material-ui/core";
import {AccountType} from "../../models";

interface AccountTypeSelectProps {
    onSelect: (accountType: AccountType) => void,
    selectedValue?: AccountType,
    error?: string
}

interface AccountTypeInfo {
    type: AccountType,
    disabled: boolean,
    label: string
}

const ACCOUNT_TYPES: AccountTypeInfo[] = [
    {type: AccountType.DATA_VALIDATOR, disabled: false, label: "Data validator"},
    {type: AccountType.SERVICE_NODE, disabled: false, label: "Service node"},
    {type: AccountType.DATA_OWNER, disabled: false, label: "Data owner"},
    {type: AccountType.DATA_MART, disabled: true, label: "Data mart"}
];

export const AccountTypeSelect: React.FC<AccountTypeSelectProps> = ({
    onSelect,
    selectedValue,
    error
}) => (
    <React.Fragment>
        <InputLabel htmlFor="accountTypeSelect">
            Account type
        </InputLabel>
        <Select value={selectedValue}
                onChange={event => onSelect(event.target.value as AccountType)}
                style={{width: '100%'}}
        >
            {ACCOUNT_TYPES.map(accountTypeItem => (
                accountTypeItem.disabled
                    ? (
                        <Tooltip title="This feature isn't supported yet">
                            <MenuItem value={accountTypeItem.type}
                                      disabled
                            >
                                {accountTypeItem.label}
                            </MenuItem>
                        </Tooltip>
                    )
                    : (
                        <MenuItem key={accountTypeItem.type}
                                  value={accountTypeItem.type}
                        >
                            {accountTypeItem.label}
                        </MenuItem>
                    )
            ))}
        </Select>
    </React.Fragment>
);
