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
import {TransactionResponse} from "../../models";

interface DataUploadInfoDialogOwnProps {
    transaction?: TransactionResponse,
    onClose: () => void
}

type DataUploadInfoDialogProps = DataUploadInfoDialogOwnProps & WithMobileDialog;

const _DataUploadInfoDialog: FunctionComponent<DataUploadInfoDialogProps> = ({
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
                    maxWidth="md"
            >
                <DialogTitle>Data Upload Info</DialogTitle>
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
                            <TableCell>Storage Price</TableCell>
                            <TableCell>{transaction?.value}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Data Owner</TableCell>
                            <TableCell>{transaction?.dataOwner}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Data Validator</TableCell>
                            <TableCell>{transaction?.dataValidator}</TableCell>
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
}

export const DataUploadInfoDialog = withMobileDialog()(_DataUploadInfoDialog) as FunctionComponent<DataUploadInfoDialogOwnProps>;
