import React, {FunctionComponent} from "react";
import {inject} from "mobx-react";
import {
    List,
    MenuItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import HistoryIcon from "@material-ui/icons/History";
import {IAppState} from "../../store";

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
        <MenuItem onClick={() => onItemClick && onItemClick()}>
            <ListItemIcon>
                <HomeIcon/>
            </ListItemIcon>
            <ListItemText>
                Home
            </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onItemClick && onItemClick()}>
            <ListItemIcon>
                <HistoryIcon/>
            </ListItemIcon>
            <ListItemText>
                Transactions history
            </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onItemClick && onItemClick()}>
            <ListItemIcon>
                <AccountBalanceIcon/>
            </ListItemIcon>
            <ListItemText>
                Accounts
            </ListItemText>
        </MenuItem>
    </List>
);

const mapMobxToProps = (state: IAppState): ServiceNodeNavigationMenuMobxProps => ({
    store: state.store
});

export const ServiceNodeNavigationMenu = inject(mapMobxToProps)(_ServiceNodeNavigationMenu) as FunctionComponent<ServiceNodeNavigationMenuOwnProps>;
