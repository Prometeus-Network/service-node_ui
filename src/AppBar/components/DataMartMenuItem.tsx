import React, {FunctionComponent} from "react";
import {inject} from "mobx-react";
import {MenuItem, ListItemIcon, ListItemText} from "@material-ui/core";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {Routes} from "../../router";
import {IAppState} from "../../store";

const {Link} = require("mobx-router");

interface DataMartMenuItemMobxProps {
    store?: any
}

const _DataMartMenuItem: FunctionComponent<DataMartMenuItemMobxProps> = ({store}) => (
    <Link store={store}
          view={Routes.dataMartHome}
          style={{
              color: 'inherit',
              textDecoration: 'none'
          }}
    >
        <MenuItem>
            <ListItemIcon style={{color: 'inherit'}}>
                <MonetizationOnIcon/>
            </ListItemIcon>
            <ListItemText>
                Data mart
            </ListItemText>
        </MenuItem>
    </Link>
);

const mapMobxToProps = (state: IAppState): DataMartMenuItemMobxProps => ({store: state.store});

export const DataMartMenuItem = inject(mapMobxToProps)(_DataMartMenuItem) as FunctionComponent<{}>;
