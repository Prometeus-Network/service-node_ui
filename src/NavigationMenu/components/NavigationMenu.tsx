import * as React from "react";
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

interface NavigationMenuMobxProps {
    store?: any
}

interface NavigationMenuOwnProps {
    onItemClick?: () => void
}

type NavigationMenuProps = NavigationMenuMobxProps & NavigationMenuOwnProps

const _NavigationMenu: React.FC<NavigationMenuProps> = ({store, onItemClick}) => (
    <List>
        <Link store={store}
              view={Routes.home}
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

const mapMobxToProps = (state: IAppState): NavigationMenuMobxProps => ({
    store: state.store
});

export const NavigationMenu = inject(mapMobxToProps)(_NavigationMenu) as React.FC<NavigationMenuOwnProps>;
