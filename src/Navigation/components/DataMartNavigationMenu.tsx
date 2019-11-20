import React, {FunctionComponent} from "react";
import {inject} from "mobx-react";
import {
    List,
    MenuItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {IAppState} from "../../store";
import {Routes} from "../../router";

const {Link} = require("mobx-router");

interface DataMartNavigationMenuMobxProps {
    store?: any
}

interface DataMartNavigationMenuOwnProps {
    onItemClick?: () => void
}

type DataMartNavigationMenuProps = DataMartNavigationMenuMobxProps & DataMartNavigationMenuOwnProps;

const _DataValidatorNavigationMenu: FunctionComponent<DataMartNavigationMenuProps> = ({
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
        <Link store={store}
              view={Routes.files}
              style={{
                  textDecoration: 'none',
                  color: 'inherit'
              }}
        >
            <MenuItem onClick={() => onItemClick && onItemClick()}>
                <ListItemIcon>
                    <InsertDriveFileIcon/>
                </ListItemIcon>
                <ListItemText>
                    Explore files
                </ListItemText>
            </MenuItem>
        </Link>
        <Link store={store}
              view={Routes.dataMartRegistration}
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
        <MenuItem onClick={() => onItemClick && onItemClick()}>
            <ListItemIcon>
                <AccountBalanceWalletIcon/>
            </ListItemIcon>
            <ListItemText>
                Accounts
            </ListItemText>
        </MenuItem>
    </List>
);

const mapMobxToProps = (state: IAppState): DataMartNavigationMenuMobxProps => ({
    store: state.store
});

export const DataMartNavigationMenu = inject(mapMobxToProps)(_DataValidatorNavigationMenu) as FunctionComponent<DataMartNavigationMenuOwnProps>;
