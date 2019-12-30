import React, {FunctionComponent} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableCell,
    TableRow,
    withMobileDialog
} from "@material-ui/core";
import {WithMobileDialog} from "@material-ui/core/withMobileDialog";
import {TransactionResponse, TransactionType} from "../../models";
import {makePreciseNumberString} from "../../utils";

interface TransactionDialogOwnProps {
    transaction?: TransactionResponse,
    onClose: () => void
}

type TransactionDialogProps = TransactionDialogOwnProps & WithMobileDialog;

const _TransactionDialog: FunctionComponent<TransactionDialogProps> = ({
    transaction,
    onClose,
    fullScreen
}) => {
    if (transaction) {
        return (
            <Dialog open={Boolean(transaction)}
                    onClose={onClose}
                    fullScreen={fullScreen}
                    fullWidth
                    maxWidth="lg"
            >
                <DialogTitle>
                    Transaction Info
                </DialogTitle>
                <DialogContent>
                    <Table>
                        <TableRow>
                            <TableCell>Txn Hash</TableCell>
                            <TableCell>{transaction?.hash}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>{transaction?.created_at}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Txn Type</TableCell>
                            <TableCell>{transaction?.type === TransactionType.DATA_PURCHASE ? "Data Purchase" : "Data Upload"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Value</TableCell>
                            <TableCell>{makePreciseNumberString(transaction?.value)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Data Owner</TableCell>
                            <TableCell>{transaction?.dataOwner}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Data Validator</TableCell>
                            <TableCell>{transaction?.dataValidator}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Data Mart</TableCell>
                            <TableCell>
                                {transaction?.type === TransactionType.DATA_PURCHASE
                                    ? transaction.dataMart
                                    : "N/A"
                                }
                            </TableCell>
                        </TableRow>
                    </Table>
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
    } else {
        return null;
    }
};

export const TransactionDialog = withMobileDialog()(_TransactionDialog) as FunctionComponent<TransactionDialogOwnProps>;
