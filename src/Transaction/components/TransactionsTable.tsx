import React, {FunctionComponent, Fragment} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    CircularProgress,
    Tooltip,
    makeStyles,
    createStyles
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

    console.log(classes);

    if (transactions.length === 0 && pending) {
        return <CircularProgress size={50} color="primary" className={classes.centered}/>
    } else {
        return (
            <Fragment>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Hash</TableCell>
                            <TableCell>From</TableCell>
                            <TableCell>To</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map(transaction => (
                            <TableRow key={transaction.id}>
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
                                <TableCell>{shortenString(transaction.from, 16)}</TableCell>
                                <TableCell>{shortenString(transaction.to, 16)}</TableCell>
                                <TableCell>{transaction.value}</TableCell>
                                <TableCell>{transaction.type === TransactionType.DATA_SELL ? "Data sell" : "Data upload"}</TableCell>
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
