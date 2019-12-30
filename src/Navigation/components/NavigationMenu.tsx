import React, {FunctionComponent} from "react";
import {inject} from "mobx-react";
import {List, ListItemIcon, ListItemText, MenuItem, createStyles, makeStyles} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {Routes} from "../../router";
import {IAppState} from "../../store";

const {Link} = require("mobx-router");

interface NavigationMenuMobxProps {
    store?: any
}

interface NavigationMenuOwnProps {
    onItemClick?: () => void
}

type NavigationMenuProps = NavigationMenuMobxProps & NavigationMenuOwnProps;

const useStyles = makeStyles(() => createStyles({
    undecoratedLink: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));

const _NavigationMenu: FunctionComponent<NavigationMenuProps> = ({
    store,
    onItemClick
}) => {
    const classes = useStyles();

    return (
        <List>
            <Link store={store}
                  view={Routes.home}
                  className={classes.undecoratedLink}
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
                  className={classes.undecoratedLink}
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
                  className={classes.undecoratedLink}
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
            <Link store={store}
                  view={Routes.dataUploads}
                  className={classes.undecoratedLink}
            >
                <MenuItem onClick={() => onItemClick && onItemClick()}>
                    <ListItemIcon>
                        <CloudUploadIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Data Uploads
                    </ListItemText>
                </MenuItem>
            </Link>
            <Link store={store}
                  view={Routes.dataPurchases}
                  className={classes.undecoratedLink}
            >
                <MenuItem onClick={() => onItemClick && onItemClick()}>
                    <ListItemIcon>
                        <MonetizationOnIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Data Purchases
                    </ListItemText>
                </MenuItem>
            </Link>
        </List>
    )
};

const mapMobxToProps = (state: IAppState): NavigationMenuMobxProps => ({
    store: state.store
});

export const NavigationMenu = inject(mapMobxToProps)(_NavigationMenu) as FunctionComponent<NavigationMenuOwnProps>;
