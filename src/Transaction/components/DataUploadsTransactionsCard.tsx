import React, {Fragment, FunctionComponent, useState} from "react";
import {inject, observer} from "mobx-react";
import {Button, Card, CardContent, CardHeader, Grid, Typography, createStyles, makeStyles} from "@material-ui/core";
import {DataUploadsTable} from "./DataUploadsTable";
import {DataUploadInfoDialog} from "./DataUploadInfoDialog";
import {ServiceNodeAccountSelect} from "../../Account";
import {IAppState} from "../../store";
import {TransactionResponse} from "../../models";
import {ApiError} from "../../api";
import {Normalized} from "../../utils";

interface DataUploadsTransactionsCardMobxProps {
    transactions: Normalized<TransactionResponse>,
    serviceNode?: string,
    pending: boolean,
    error?: ApiError,
    serviceNodes: string[],
    fetchTransactions: () => void,
    selectServiceNode: (serviceNode: string) => void
}

const useStyles = makeStyles(() => createStyles({
    dataUploadsCard: {
        overflowX: 'auto'
    }
}));

const _DataUploadsTransactionsCard: FunctionComponent<DataUploadsTransactionsCardMobxProps> = ({
    transactions,
    serviceNode,
    pending,
    error,
    serviceNodes,
    fetchTransactions,
    selectServiceNode,
}) => {
    const [transactionInDialog, setTransactionInDialog] = useState<TransactionResponse | undefined>(undefined);
    const classes = useStyles();

    if (Object.keys(transactions).length === 0 && !pending) {
        if (error) {
            return <Typography variant="body1">Error occurred when tried to fetch transactions</Typography>
        } else {
            return <Typography variant="body1">No transactions have been found</Typography>
        }
    } else {
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
                        <Card className={classes.dataUploadsCard}>
                            <CardHeader title={`Data uploads through service node ${serviceNode}`}/>
                            <CardContent>
                                <DataUploadsTable transactions={Object.keys(transactions).map(hash => transactions[hash])}
                                                  pending={pending}
                                                  onTransactionDetailsRequest={setTransactionInDialog}
                                />
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
                <DataUploadInfoDialog onClose={() => setTransactionInDialog(undefined)}
                                      transaction={transactionInDialog}
                />
            </Fragment>
        )
    }
};

const mapMobxToProps = (state: IAppState): DataUploadsTransactionsCardMobxProps => ({
    pending: state.dataUploads.pending,
    transactions: state.dataUploads.transactions,
    serviceNode: state.dataUploads.serviceNodeAccount,
    selectServiceNode: state.settings.selectServiceNodeAccount,
    serviceNodes: state.settings.serviceNodeAccounts.map(account => account.address),
    error: state.dataUploads.error,
    fetchTransactions: state.dataUploads.fetchDataUploadsHistory
});

export const DataUploadsTransactionsCard = inject(mapMobxToProps)(observer(_DataUploadsTransactionsCard) as FunctionComponent<{}>);
