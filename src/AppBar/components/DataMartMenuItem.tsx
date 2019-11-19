import React, {FunctionComponent} from "react";
import {MenuItem, ListItemIcon, ListItemText} from "@material-ui/core";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export const DataMartMenuItem: FunctionComponent<{}> = () => (
    <MenuItem>
        <ListItemIcon style={{color: 'inherit'}}>
            <MonetizationOnIcon/>
        </ListItemIcon>
        <ListItemText>
            Data mart
        </ListItemText>
    </MenuItem>
);
