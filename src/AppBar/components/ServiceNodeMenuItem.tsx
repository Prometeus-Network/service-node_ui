import React, {FunctionComponent} from "react";
import {MenuItem, ListItemIcon, ListItemText} from "@material-ui/core";
import StorageIcon from "@material-ui/icons/Storage";
import {Routes} from "../../router";
import {IAppState} from "../../store";
import {inject} from "mobx-react";

const {Link} = require("mobx-router");

interface ServiceNodeMenuItemMobxProps {
    store?: any
}

const _ServiceNodeMenuItem: FunctionComponent<ServiceNodeMenuItemMobxProps> = ({store}) => (
    <Link store={store}
          view={Routes.serviceNodeHome}
          style={{
              color: 'inherit',
              textDecoration: 'none'
          }}
    >
        <MenuItem color="inherit">
            <ListItemIcon style={{color: 'inherit'}}>
                <StorageIcon/>
            </ListItemIcon>
            <ListItemText>
                Service node
            </ListItemText>
        </MenuItem>
    </Link>
);

const mapMobxToProps = (state: IAppState): ServiceNodeMenuItemMobxProps => ({
    store: state.store
});

export const ServiceNodeMenuItem = inject(mapMobxToProps)(_ServiceNodeMenuItem);
