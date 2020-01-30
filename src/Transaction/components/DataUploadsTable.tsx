import React, {Fragment, FunctionComponent} from "react";
import {
    CircularProgress,
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@material-ui/core";
import {TransactionResponse} from "../../models";
import {makePreciseNumberString, shortenString} from "../../utils";

interface DataUploadsTableProps {
    transactions: TransactionResponse[],
    pending: boolean,
    onTransactionDetailsRequest: (transaction: TransactionResponse) => void
}

const useStyles = makeStyles(() => createStyles({
    centered: {
        marginRight: "auto",
        marginLeft: "auto",
        display: "table"
    },
    hyperlinkLike: {
        cursor: "pointer"
    }
}));

export const DataUploadsTable: FunctionComponent<DataUploadsTableProps> = ({
    transactions,
    pending,
    onTransactionDetailsRequest
}) => {
    const classes = useStyles();

    if (transactions.length === 0 && pending) {
        return <CircularProgress size={50} color="primary" className={classes.centered}/>;
    } else {
        return (
            <Fragment>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Txn Hash</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Storage Price</TableCell>
                            <TableCell>Data Owner</TableCell>
                            <TableCell>Data Validator</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map(transaction => (
                            <TableRow>
                                <TableCell>
                                    <Tooltip title="Show details">
                                        <Typography variant="body1"
                                                    className={classes.hyperlinkLike}
                                                    onClick={() => onTransactionDetailsRequest(transaction)}
                                        >
                                            <u>{shortenString(transaction.hash, 16)}</u>
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{transaction.created_at}</TableCell>
                                <TableCell>{makePreciseNumberString(transaction.value)}</TableCell>
                                <TableCell>{shortenString(transaction.dataOwner, 16)}</TableCell>
                                <TableCell>{shortenString(transaction.dataValidator, 16)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {pending && <CircularProgress size={50} color="primary" className={classes.centered}/>}
            </Fragment>
        )
    }
};
