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
            >
                <DialogTitle>
                    Transaction info
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Hash: {transaction.hash}</Typography>
                    <Typography variant="body1">From: {transaction.from}</Typography>
                    <Typography variant="body1">To: {transaction.to}</Typography>
                    <Typography variant="body1">Value: {transaction.value} PROM</Typography>
                    <Typography variant="body1">Type: {
                        transaction.type === TransactionType.DATA_SELL
                            ? "Data sell"
                            : "Data upload"
                    }
                    </Typography>
                    <Typography variant="body1">Status: {
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
