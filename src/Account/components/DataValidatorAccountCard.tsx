import * as React from "react";
import {Fragment, FunctionComponent, useState} from "react";
import getClassName from "clsx";
import {
    Card,
    CardContent,
    CardHeader,
    Collapse,
    createStyles,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Theme,
    Tooltip,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {CreateDataOwnerButton} from "./CreateDataOwnerButton";

interface DataValidatorAccountCardProps {
    address: string,
    dataOwners: string[],
    balance: number,
    selectedAsDefault: boolean,
    onSelect: (address: string) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

const getBalanceLabel = (balance?: number): string => {
    if (balance === undefined) {
        return "0 ETH";
    } else {
        return `${balance} ETH`;
    }
};

export const DataValidatorAccountCard: FunctionComponent<DataValidatorAccountCardProps> = ({
    address,
    dataOwners,
    balance,
    selectedAsDefault,
    onSelect
}) => {
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();

    const handleExpandClick = (): void => {
        setExpanded(!expanded);
    };

    const cursor = selectedAsDefault ? 'default' : 'pointer';

    return (
        <Card elevation={selectedAsDefault ? 3 : 1}
              onClick={() => !selectedAsDefault && onSelect(address)}
              style={{cursor}}
        >
            <CardHeader title={(
                <Fragment>
                    <Hidden lgUp>
                        <Typography variant="caption">
                            {address}
                        </Typography>
                    </Hidden>
                    <Hidden mdDown>
                        {address}
                    </Hidden>
                </Fragment>
            )}
                        subheader={(
                            <Fragment>
                                <div>{getBalanceLabel(balance)}</div>
                                <div>Number of data owners: {dataOwners.length}</div>
                            </Fragment>
                        )}
                        action={(
                            <Fragment>
                                {selectedAsDefault && <CreateDataOwnerButton/>}
                                <Tooltip title={expanded
                                    ? "Hide data owners"
                                    : "Show data owners"
                                }>
                                    <IconButton className={
                                        getClassName(classes.expand, {
                                            [classes.expandOpen]: expanded
                                    })}
                                                onClick={handleExpandClick}
                                                aria-expanded={expanded}
                                    >
                                        <ExpandMoreIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Fragment>
                        )}
            />
            {selectedAsDefault && (
                <CardContent>
                    <Typography variant="h6" color="textSecondary">
                        Selected as default
                    </Typography>
                </CardContent>
            )}
            <Collapse in={expanded}
                      timeout="auto"
                      unmountOnExit
            >
                <CardContent>
                    <Typography variant="body1">
                        Data owners:
                    </Typography>
                    <List>
                        {dataOwners.map(dataOwnerAddress => (
                            <ListItem key={dataOwnerAddress}>
                                <ListItemText>
                                    {dataOwnerAddress}
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Collapse>
        </Card>
    )
};
