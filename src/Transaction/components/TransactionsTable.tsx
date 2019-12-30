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
import {TransactionResponse, TransactionType} from "../../models";
import {shortenString} from "../../utils";

interface TransactionsTableProps {
    transactions: TransactionResponse[],
    pending: boolean,
    onTransactionDetailsRequest: (transaction: TransactionResponse) => void
}

const useStyles = makeStyles(() => createStyles({
    centered: {
        marginRight: 'auto',
        marginLeft: 'auto'
    }
}));

export const TransactionsTable: FunctionComponent<TransactionsTableProps> = ({transactions, pending, onTransactionDetailsRequest}) => {
    const classes = useStyles();

    if (transactions.length === 0 && pending) {
        return <CircularProgress size={50} color="primary" className={classes.centered}/>
    } else {
        return (
            <Fragment>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Txn Hash</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Data Owner</TableCell>
                            <TableCell>Data Validator</TableCell>
                            <TableCell>Data Mart</TableCell>
                            <TableCell>Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map(transaction => (
                            <TableRow key={transaction.hash}>
                                <TableCell>
                                    <Tooltip title="View details">
                                        <Typography variant="body1"
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => onTransactionDetailsRequest(transaction)}
                                        >
                                            <u>{shortenString(transaction.hash, 16)}</u>
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{transaction.created_at}</TableCell>
                                <TableCell>{transaction.value}</TableCell>
                                <TableCell>{shortenString(transaction.dataOwner, 16)}</TableCell>
                                <TableCell>{shortenString(transaction.dataValidator, 16)}</TableCell>
                                <TableCell>
                                    {transaction.type === TransactionType.DATA_PURCHASE
                                        ? shortenString(transaction.dataMart, 16)
                                        : "N/A"
                                    }
                                </TableCell>
                                <TableCell>{transaction.type === TransactionType.DATA_PURCHASE ? "Data sell" : "Data upload"}</TableCell>
                                <TableCell>
                                    {transaction.status
                                        ? <Typography style={{color: 'green'}}>Success</Typography>
                                        : <Typography style={{color: 'red'}}>Error</Typography>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {pending && <CircularProgress size={50} color="primary" className={classes.centered}/>}
            </Fragment>
        )
    }
};
