import React, {FunctionComponent} from "react";
import {MenuItem, ListItemIcon, ListItemText} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

export const DataValidatorMenuItem: FunctionComponent<{}> = () => (
    <MenuItem color="inherit">
        <ListItemIcon style={{color: 'inherit'}}>
            <CheckIcon/>
        </ListItemIcon>
        <ListItemText>
            Data validator
        </ListItemText>
    </MenuItem>
);
