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
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import {IAppState} from "../../store";

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
        <MenuItem onClick={() => onItemClick && onItemClick()}>
            <ListItemIcon>
                <InsertDriveFileIcon/>
            </ListItemIcon>
            <ListItemText>
                Explore files
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

const mapMobxToProps = (state: IAppState): DataMartNavigationMenuMobxProps => ({
    store: state.store
});

export const DataMartNavigationMenu = inject(mapMobxToProps)(_DataValidatorNavigationMenu) as FunctionComponent<DataMartNavigationMenuOwnProps>;
