import React, {Fragment, FunctionComponent, ReactNode, useState} from "react";
import {inject, observer} from "mobx-react";
import {Button, Card, CardContent, CardHeader, Grid, Typography, createStyles, makeStyles} from "@material-ui/core";
import {DataPurchasesTable} from "./DataPurchasesTable";
import {DataPurchaseInfoDialog} from "./DataPurchaseInfoDialog";
import {ServiceNodeAccountSelect} from "../../Account";
import {IAppState} from "../../store";
import {TransactionResponse} from "../../models";
import {ApiError} from "../../api";
import {Normalized} from "../../utils";

interface DataPurchasesTransactionsCardMobxProps {
    transactions: Normalized<TransactionResponse>,
    serviceNode?: string,
    pending: boolean,
    error?: ApiError,
    serviceNodes: string[],
    fetchTransactions: () => void,
    selectServiceNode: (serviceNode: string) => void
}

const useStyles = makeStyles(() => createStyles({
    dataPurchasesCard: {
        overflowX: 'auto'
    }
}));

const _DataPurchasesTransactionsCard: FunctionComponent<DataPurchasesTransactionsCardMobxProps> = ({
    transactions,
    pending,
    serviceNode,
    error,
    serviceNodes,
    fetchTransactions,
    selectServiceNode
}) => {
    const [transactionInDialog, setTransactionInDialog] = useState<TransactionResponse | undefined>(undefined);
    const classes = useStyles();

    let content: ReactNode;


    if (Object.keys(transactions).length === 0 && !pending) {
        if (error) {
            content = <Typography variant="body1">Error occurred when tried to fetch transactions</Typography>
        } else {
            content = <Typography variant="body1">No transactions have been found</Typography>
        }
    } else {
        content = (
            <DataPurchasesTable transactions={Object.keys(transactions).map(hash => transactions[hash])}
                                pending={pending}
                                onTransactionDetailsRequest={setTransactionInDialog}
            />
        )
    }

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ServiceNodeAccountSelect accounts={serviceNodes}
                                              onSelect={selectServiceNode}
                                              selectedAccount={serviceNode}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.dataPurchasesCard}>
                        <CardHeader title={`Data purchases through service node ${serviceNode}`}/>
                        <CardContent>
                            {content}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined"
                            color="primary"
                            onClick={fetchTransactions}
                            disabled={pending}
                    >
                        Load more
                    </Button>
                </Grid>
            </Grid>
            <DataPurchaseInfoDialog transaction={transactionInDialog}
                                    onClose={() => setTransactionInDialog(undefined)}
            />
        </Fragment>
    )
};

const mapMobxToProps = (state: IAppState): DataPurchasesTransactionsCardMobxProps => ({
    transactions: state.dataPurchases.transactions,
    serviceNodes: state.accounts.accounts.map(account => account.address),
    pending: state.dataPurchases.pending,
    serviceNode: state.dataPurchases.serviceNodeAccount,
    selectServiceNode: state.settings.selectServiceNodeAccount,
    error: state.dataPurchases.error,
    fetchTransactions: state.dataPurchases.fetchPurchasesHistory
});

export const DataPurchasesTransactionsCard = inject(mapMobxToProps)(observer(_DataPurchasesTransactionsCard) as FunctionComponent<{}>);
