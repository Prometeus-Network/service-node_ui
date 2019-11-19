import React, {FunctionComponent} from "react";
import {inject} from "mobx-react";
import {MenuItem, ListItemIcon, ListItemText} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import {Routes} from "../../router";
import {IAppState} from "../../store";

const {Link} = require("mobx-router");

interface DataValidatorMenuItemMobxProps {
    store?: any
}

const _DataValidatorMenuItem: FunctionComponent<DataValidatorMenuItemMobxProps> = ({store}) => (
    <Link store={store}
          view={Routes.dataValidatorHome}
          style={{
              color: 'inherit',
              textDecoration: 'none'
          }}
    >
        <MenuItem color="inherit">
            <ListItemIcon style={{color: 'inherit'}}>
                <CheckIcon/>
            </ListItemIcon>
            <ListItemText>
                Data validator
            </ListItemText>
        </MenuItem>
    </Link>
);

const mapMobxToProps = (state: IAppState): DataValidatorMenuItemMobxProps => ({
    store: state.store
});

export const DataValidatorMenuItem = inject(mapMobxToProps)(_DataValidatorMenuItem);
