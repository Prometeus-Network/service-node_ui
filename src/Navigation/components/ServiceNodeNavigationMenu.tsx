import React, {FunctionComponent} from "react";
import {inject} from "mobx-react";
import {List, ListItemIcon, ListItemText, MenuItem} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {Routes} from "../../router";
import {IAppState} from "../../store";

const {Link} = require("mobx-router");

interface ServiceNodeNavigationMenuMobxProps {
    store?: any
}

interface ServiceNodeNavigationMenuOwnProps {
    onItemClick?: () => void
}

type ServiceNodeNavigationMenuProps = ServiceNodeNavigationMenuMobxProps & ServiceNodeNavigationMenuOwnProps;

const _ServiceNodeNavigationMenu: FunctionComponent<ServiceNodeNavigationMenuProps> = ({
    store,
    onItemClick
}) => (
    <List>
        <Link store={store}
              view={Routes.serviceNodeHome}
              style={{
                  textDecoration: 'none',
                  color: 'inherit'
              }}
        >
            <MenuItem onClick={() => onItemClick && onItemClick()}>
                <ListItemIcon>
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText>
                    Home
                </ListItemText>
            </MenuItem>
        </Link>
        <Link store={store}
              view={Routes.serviceNodeRegistration}
              style={{
                  textDecoration: 'none',
                  color: 'inherit'
              }}
        >
            <MenuItem onClick={() => onItemClick && onItemClick()}>
                <ListItemIcon>
                    <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText>
                    Register
                </ListItemText>
            </MenuItem>
        </Link>
        <Link store={store}
              view={Routes.serviceNodeTransactions}
              style={{
                  textDecoration: 'none',
                  color: 'inherit'
              }}
        >
            <MenuItem onClick={() => onItemClick && onItemClick()}>
                <ListItemIcon>
                    <HistoryIcon/>
                </ListItemIcon>
                <ListItemText>
                    Transactions
                </ListItemText>
            </MenuItem>
        </Link>
    </List>
);

const mapMobxToProps = (state: IAppState): ServiceNodeNavigationMenuMobxProps => ({
    store: state.store
});

export const ServiceNodeNavigationMenu = inject(mapMobxToProps)(_ServiceNodeNavigationMenu) as FunctionComponent<ServiceNodeNavigationMenuOwnProps>;
