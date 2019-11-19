import React, {FunctionComponent} from "react";
import {inject} from "mobx-react";
import {
    List,
    MenuItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import UploadIcon from "@material-ui/icons/CloudUpload"
import AccountIcon from "@material-ui/icons/AccountCircle"
import SettingsIcon from "@material-ui/icons/Settings";
import {Routes} from "../../router";
import {IAppState} from "../../store";

const {Link} = require("mobx-router");

interface DataValidatorNavigationMenuMobxProps {
    store?: any
}

interface DataValidatorNavigationMenuOwnProps {
    onItemClick?: () => void,
}

type DataValidatorNavigationMenuProps = DataValidatorNavigationMenuMobxProps & DataValidatorNavigationMenuOwnProps

const _DataValidatorNavigationMenu: FunctionComponent<DataValidatorNavigationMenuProps> = ({store, onItemClick}) => (
    <List>
        <Link store={store}
              view={Routes.dataValidatorHome}
              style={{
                  textDecoration: 'none',
                  color: 'inherit'
              }}
        >
            <MenuItem onClick={() => onItemClick && onItemClick()}>
                <ListItemIcon>
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
            </MenuItem>
        </Link>
        <Link store={store}
              view={Routes.dataUpload}
              style={{
                  textDecoration: 'none',
                  color: 'inherit'
              }}
        >
            <MenuItem onClick={() => onItemClick && onItemClick()}>
                <ListItemIcon>
                    <UploadIcon/>
                </ListItemIcon>
                <ListItemText>Upload data</ListItemText>
            </MenuItem>
        </Link>
        <Link store={store}
              view={Routes.registration}
              style={{
                  textDecoration: 'none',
                  color: 'inherit'
              }}
        >
            <MenuItem onClick={() => onItemClick && onItemClick()}>
                <ListItemIcon>
                    <AccountIcon/>
                </ListItemIcon>
                <ListItemText>
                    Register
                </ListItemText>
            </MenuItem>
        </Link>
        <Link store={store}
              view={Routes.settings}
              style={{
                  textDecoration: 'none',
                  color: 'inherit'
              }}
        >
            <MenuItem onClick={() => onItemClick && onItemClick()}>
                <ListItemIcon>
                    <SettingsIcon/>
                </ListItemIcon>
                <ListItemText>
                    Settings
                </ListItemText>
            </MenuItem>
        </Link>
    </List>
);

const mapMobxToProps = (state: IAppState): DataValidatorNavigationMenuMobxProps => ({
    store: state.store
});

export const DataValidatorNavigationMenu = inject(mapMobxToProps)(_DataValidatorNavigationMenu) as FunctionComponent<DataValidatorNavigationMenuOwnProps>;
