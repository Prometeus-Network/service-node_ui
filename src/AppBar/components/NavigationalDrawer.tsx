import * as React from "react";
import {inject, observer} from "mobx-react";
import {SwipeableDrawer} from "@material-ui/core";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CheckIcon from "@material-ui/icons/Check";
import StorageIcon from "@material-ui/icons/Storage";

import {
    DataValidatorNavigationMenu,
    DataMartNavigationMenu,
    ServiceNodeNavigationMenu,
    ExpandableMenuContainer
} from "../../NavigationMenu";
import {IAppState} from "../../store";

interface NavigationalDrawerProps {
    drawerOpen: boolean,
    setDrawerOpen: (open: boolean) => void
}

const _NavigationalDrawer: React.FC<NavigationalDrawerProps> = ({
    drawerOpen,
    setDrawerOpen
}) => {
    const closeDrawer = () => setDrawerOpen(false);

    return (
        <SwipeableDrawer onClose={() => setDrawerOpen(false)}
                         onOpen={() => setDrawerOpen(true)}
                         open={drawerOpen}
        >
            <ExpandableMenuContainer label="Service node"
                                     icon={<StorageIcon/>}
            >
                <ServiceNodeNavigationMenu onItemClick={closeDrawer}/>
            </ExpandableMenuContainer>
            <ExpandableMenuContainer label="Data validator"
                                     icon={<CheckIcon/>}
            >
                <DataValidatorNavigationMenu onItemClick={closeDrawer}/>
            </ExpandableMenuContainer>
            <ExpandableMenuContainer label="Data mart"
                                     icon={<MonetizationOnIcon/>}
            >
                <DataMartNavigationMenu onItemClick={closeDrawer}/>
            </ExpandableMenuContainer>
        </SwipeableDrawer>
    )
};

const mapMobxToProps = (state: IAppState): NavigationalDrawerProps => ({
    setDrawerOpen: state.drawer.setOpen,
    drawerOpen: state.drawer.open
});

export const NavigationalDrawer = inject(mapMobxToProps)(observer(_NavigationalDrawer)) as React.FC<any>;
