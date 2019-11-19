import React, {Fragment} from "react";
import {inject} from "mobx-react";
import CheckIcon from "@material-ui/icons/Check";
import StorageIcon from "@material-ui/icons/Storage";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import {IAppState} from "../../store";
import {ExpandableMenuContainer} from "./ExpandableMenuContainer";
import {ServiceNodeNavigationMenu} from "./ServiceNodeNavigationMenu";
import {DataValidatorNavigationMenu} from "./DataValidatorNavigationMenu";
import {DataMartNavigationMenu} from "./DataMartNavigationMenu";

const {Link} = require("mobx-router");

interface NavigationMenuMobxProps {
    store?: any
}

interface NavigationMenuOwnProps {
    onItemClick?: () => void,
    hideExpansionIcons?: boolean
}

type NavigationMenuProps = NavigationMenuMobxProps & NavigationMenuOwnProps

const _NavigationMenu: React.FC<NavigationMenuProps> = ({store, onItemClick, hideExpansionIcons = false}) => (
    <Fragment>
        <ExpandableMenuContainer label="Service node"
                                 icon={<StorageIcon/>}
                                 hideExpansionIcon={hideExpansionIcons}
        >
            <ServiceNodeNavigationMenu onItemClick={onItemClick}/>
        </ExpandableMenuContainer>
        <ExpandableMenuContainer label="Data validator"
                                 icon={<CheckIcon/>}
                                 hideExpansionIcon={hideExpansionIcons}
        >
            <DataValidatorNavigationMenu onItemClick={onItemClick}/>
        </ExpandableMenuContainer>
        <ExpandableMenuContainer label="Data mart"
                                 icon={<MonetizationOnIcon/>}
                                 hideExpansionIcon={hideExpansionIcons}
        >
            <DataMartNavigationMenu onItemClick={onItemClick}/>
        </ExpandableMenuContainer>
    </Fragment>
);

const mapMobxToProps = (state: IAppState): NavigationMenuMobxProps => ({
    store: state.store
});

export const NavigationMenu = inject(mapMobxToProps)(_NavigationMenu) as React.FC<NavigationMenuOwnProps>;
