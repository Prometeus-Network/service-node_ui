import React, {FunctionComponent} from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Button,
    Typography,
    withMobileDialog
} from "@material-ui/core";
import {WithMobileDialog} from "@material-ui/core/withMobileDialog";
import {TransactionResponse, TransactionType} from "../../models";

interface TransactionDialogOwnProps {
    transaction?: TransactionResponse,
    onClose: () => void
}

type TransactionDialogProps = TransactionDialogOwnProps & WithMobileDialog;

const _TransactionDialog: FunctionComponent<TransactionDialogProps> = ({
    transaction,
    onClose,
    fullScreen
}) => (
    transaction
        ? (
            <Dialog open={Boolean(transaction)}
                    onClose={onClose}
                    fullScreen={fullScreen}
                    fullWidth
                    maxWidth="lg"
            >
                <DialogTitle>
                    Transaction info
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1"><b>Hash:</b> {transaction.hash}</Typography>
                    <Typography variant="body1"><b>Data validator:</b> {transaction.dataValidator}</Typography>
                    <Typography variant="body1"><b>Data mart:</b> {transaction.dataMart}</Typography>
                    <Typography variant="body1"><b>Data owner:</b> {transaction.dataOwner}</Typography>
                    <Typography variant="body1"><b>Service node:</b> {transaction.serviceNode}</Typography>
                    <Typography variant="body1"><b>Value:</b> {transaction.value} PROM</Typography>
                    <Typography variant="body1"><b>Type:</b> {
                        transaction.type === TransactionType.DATA_PURCHASE
                            ? "Data sell"
                            : "Data upload"
                    }
                    </Typography>
                    <Typography variant="body1"><b>Status:</b> {
                        transaction.status
                            ? <span style={{color: 'green'}}>Success</span>
                            : <span style={{color: 'red'}}>Error</span>
                    }
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined"
                            color="secondary"
                            onClick={onClose}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
        : null
);

export const TransactionDialog = withMobileDialog()(_TransactionDialog) as FunctionComponent<TransactionDialogOwnProps>;
