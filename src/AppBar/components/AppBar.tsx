import * as React from "react";
import {inject} from "mobx-react";
import {
    AppBar as MaterialUiAppBar,
    Hidden,
    Toolbar,
    Typography,
    withStyles,
    createStyles
} from "@material-ui/core";
import {NavigationalDrawer} from "./NavigationalDrawer";
import {OpenDrawerButton} from "./OpenDrawerButton";
import Headroom from "react-headroom";
import {Routes} from "../../router";
import {IAppState} from "../../store";

const {Link} = require('mobx-router');

interface AppBarProps {
    title?: string
}

interface AppBarInjectedProps {
    classes: any,
}

interface AppBarMobxProps {
    store: any
}

const styles = createStyles({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    }
});

const _AppBar: React.FC<AppBarProps & AppBarMobxProps & AppBarInjectedProps> = ({title, classes, store}) => {
    const linkToHome = (
        <Link store={store}
              view={Routes.home}
              style={{
                  textDecoration: 'none',
                  color: 'inherit'
              }}
        >
            Service node
        </Link>
    );

    return (
        <Headroom style={{
            position: 'fixed',
            zIndex: 1300
        }}>
            <MaterialUiAppBar position="static"
                              classes={classes}
            >
                <Toolbar>
                    <Hidden lgUp>
                        <OpenDrawerButton/>
                    </Hidden>
                    <Typography variant="h6" className={classes.grow}>
                        {title
                            ? <span>
                                {linkToHome} <Hidden smDown> | {title}</Hidden>
                        </span>
                            : linkToHome
                        }
                    </Typography>
                </Toolbar>
            </MaterialUiAppBar>
            <NavigationalDrawer/>
        </Headroom>
    )
};

const mapMobxToProps = (appState: IAppState): AppBarMobxProps => ({
    store: appState.store
});

export const AppBar = withStyles(styles)(inject(mapMobxToProps)(_AppBar)) as React.FC<AppBarProps>;