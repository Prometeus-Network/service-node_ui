import React, {Fragment, FunctionComponent, ReactElement, useState} from "react";
import {Collapse, IconButton, ListItemIcon, ListItemText, MenuItem} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

interface ExpandableMenuContainerProps {
    label: string,
    icon?: ReactElement,
    hideExpansionIcon?: boolean
}

export const ExpandableMenuContainer: FunctionComponent<ExpandableMenuContainerProps> = ({
    label,
    icon,
    hideExpansionIcon = false,
    children
}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Fragment>
            <MenuItem onClick={() => hideExpansionIcon && setExpanded((!expanded))}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText>
                    {label}
                </ListItemText>
                {!hideExpansionIcon && (
                    <ListItemIcon>
                        <IconButton onClick={() => setExpanded(!expanded)}>
                            {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        </IconButton>
                    </ListItemIcon>
                )}
            </MenuItem>
            <Collapse in={expanded} unmountOnExit style={{marginLeft: 10}}>
                {children}
            </Collapse>
        </Fragment>
    )
};

