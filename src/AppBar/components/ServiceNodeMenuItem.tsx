import React, {FunctionComponent} from "react";
import {MenuItem, ListItemIcon, ListItemText} from "@material-ui/core";
import StorageIcon from "@material-ui/icons/Storage";

export const ServiceNodeMenuItem: FunctionComponent<{}> = () => (
    <MenuItem color="inherit">
        <ListItemIcon style={{color: 'inherit'}}>
            <StorageIcon/>
        </ListItemIcon>
        <ListItemText>
            Service node
        </ListItemText>
    </MenuItem>
);
