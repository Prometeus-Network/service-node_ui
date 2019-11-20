import React, {FunctionComponent} from "react";
import {inject} from "mobx-react";
import {List, ListItemIcon, ListItemText, MenuItem} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
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
        <Link store={store}
              view={Routes.dataMartHome}
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
    </List>
);

const mapMobxToProps = (state: IAppState): DataMartNavigationMenuMobxProps => ({
    store: state.store
});

export const DataMartNavigationMenu = inject(mapMobxToProps)(_DataValidatorNavigationMenu) as FunctionComponent<DataMartNavigationMenuOwnProps>;
