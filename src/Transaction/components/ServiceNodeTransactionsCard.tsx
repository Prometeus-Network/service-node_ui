import React, {FunctionComponent, Fragment, useState, ReactNode} from "react";
import {inject, observer} from "mobx-react";
import {Card, CardHeader, CardContent, Grid, Button, Typography} from "@material-ui/core";
import {withSnackbar, WithSnackbarProps} from "notistack";
import {TransactionsTable} from "./TransactionsTable";
import {TransactionDialog} from "./TransactionDialog";
import {IAppState} from "../../store";
import {TransactionResponse} from "../../models";
import {ApiError} from "../../api";
import {Normalized} from "../../utils";
import {ServiceNodeAccountSelect} from "../../Account/components";

interface ServiceNodeTransactionsCardMobxProps {
    transactions: Normalized<TransactionResponse>,
    serviceNode?: string,
    serviceNodes: string[],
    pending: boolean,
    error?: ApiError,
    showSnackbar: boolean,
    setShowSnackbar: (showSnackbar: boolean) => void,
    fetchTransactions: () => void,
    selectServiceNode: (serviceNode: string) => void
}

type ServiceNodeTransactionsCardProps = ServiceNodeTransactionsCardMobxProps & WithSnackbarProps;

const _ServiceNodeTransactionsCard: FunctionComponent<ServiceNodeTransactionsCardProps> = ({
    transactions,
    showSnackbar,
    error,
    pending,
    serviceNode,
    setShowSnackbar,
    fetchTransactions,
    enqueueSnackbar,
    serviceNodes,
    selectServiceNode
}) => {
    const [transactionInDialog, setTransactionInDialog] = useState<TransactionResponse | undefined>(undefined);

    if (showSnackbar) {
        if (error) {
            enqueueSnackbar("Error occurred when tried to fetch transactions", {variant: "error"});
        }

        setShowSnackbar(false);
    }

    let content: ReactNode;

    if (Object.keys(transactions).length === 0 && !pending) {
        if (error) {
            content = <Typography variant="body1">Error occurred when tried to fetch transactions</Typography>
        } else {
            content = <Typography variant="body1">No transactions have been found</Typography>
        }
    } else {
        content = (
            <TransactionsTable transactions={Object.keys(transactions).map(key => transactions[key])}
                               pending={pending}
                               onTransactionDetailsRequest={transaction => setTransactionInDialog(transaction)}
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
                    <Card style={{overflowX: 'auto'}}>
                        <CardHeader title={`Transactions of service node ${serviceNode}`}/>
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
            <TransactionDialog transaction={transactionInDialog}
                               onClose={() => setTransactionInDialog(undefined)}
            />
        </Fragment>
    )
};

const mapMobxToProps = (state: IAppState): ServiceNodeTransactionsCardMobxProps => ({
    pending: state.serviceNodeTransactions.pending,
    transactions: state.serviceNodeTransactions.transactions,
    error: state.serviceNodeTransactions.error,
    serviceNode: state.serviceNodeTransactions.serviceNodeAddress,
    showSnackbar: state.serviceNodeTransactions.showSnackbar,
    setShowSnackbar: state.serviceNodeTransactions.setShowSnackbar,
    fetchTransactions: state.serviceNodeTransactions.fetchTransactions,
    selectServiceNode: state.settings.selectServiceNodeAccount,
    serviceNodes: state.accounts.accounts.map(account => account.address)
});

export const ServiceNodeTransactionsCard = withSnackbar(
    inject(mapMobxToProps)(observer(_ServiceNodeTransactionsCard) as FunctionComponent<{}>)
);
