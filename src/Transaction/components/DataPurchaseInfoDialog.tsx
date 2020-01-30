import React, {FunctionComponent} from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    Table,
    TableRow,
    TableCell,
} from "@material-ui/core";
import withMobileDialog, {WithMobileDialog} from "@material-ui/core/withMobileDialog";
import {TransactionResponse} from "../../models";
import {makePreciseNumberString} from "../../utils";

interface DataPurchaseInfoDialogOwnProps {
    transaction?: TransactionResponse,
    onClose: () => void
}

type DataPurchaseInfoDialogInjectedProps = WithMobileDialog;

type DataPurchaseInfoDialogProps = DataPurchaseInfoDialogOwnProps & DataPurchaseInfoDialogInjectedProps;

const _DataPurchaseInfoDialog: FunctionComponent<DataPurchaseInfoDialogProps> = ({
    transaction,
    onClose,
    fullScreen
}) => {
    if (transaction) {
        return (
            <Dialog open={Boolean(transaction)}
                    fullScreen={fullScreen}
                    fullWidth
                    maxWidth="md"
                    onClose={onClose}
            >
                <DialogTitle>Data Purchase Info</DialogTitle>
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
                            <TableCell>Price</TableCell>
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
                            <TableCell>{transaction?.dataMart}</TableCell>
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

export const DataPurchaseInfoDialog = withMobileDialog()(_DataPurchaseInfoDialog);
