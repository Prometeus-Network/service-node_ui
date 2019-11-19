import React, {Fragment, FunctionComponent, ReactElement, useState} from "react";
import {Collapse, IconButton, ListItemIcon, ListItemText, MenuItem} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

interface ExpandableMenuContainerProps {
    label: string,
    icon?: ReactElement
}

export const ExpandableMenuContainer: FunctionComponent<ExpandableMenuContainerProps> = ({
    label,
    icon,
    children
}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Fragment>
            <MenuItem>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText>
                    {label}
                </ListItemText>
                <ListItemIcon>
                    <IconButton onClick={() => setExpanded(!expanded)}>
                        {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    </IconButton>
                </ListItemIcon>
            </MenuItem>
            <Collapse in={expanded} unmountOnExit>
                {children}
            </Collapse>
        </Fragment>
    )
};

