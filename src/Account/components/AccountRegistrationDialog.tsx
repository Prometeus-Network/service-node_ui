import React, {FunctionComponent} from "react";
import {inject, observer} from "mobx-react";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@material-ui/core";
import withMobileDialog, {WithMobileDialog} from "@material-ui/core/withMobileDialog";
import {withSnackbar, WithSnackbarProps} from "notistack";
import {RegisterAccountRequest} from "../../models";
import {FormErrors} from "../../utils";
import {ApiError} from "../../api";
import {IAppState} from "../../store";

interface AccountRegistrationDialogMobxProps {
    registrationForm: Partial<RegisterAccountRequest>,
    formErrors: FormErrors<RegisterAccountRequest>,
    submissionError?: ApiError,
    pending: boolean,
    registrationDialogOpen: boolean,
    showSnackbar: boolean,
    setShowSnackbar: (showSnackbar: boolean) => void,
    setFormValue: (key: keyof RegisterAccountRequest, value: string) => void,
    setRegistrationDialogOpen: (registrationDialogOpen: boolean) => void,
    registerAccount: () => void
}

type AccountRegistrationDialogInjectedProps = WithMobileDialog & WithSnackbarProps;

type AccountRegistrationDialogProps = AccountRegistrationDialogMobxProps & AccountRegistrationDialogInjectedProps;

const _AccountRegistrationDialog: FunctionComponent<AccountRegistrationDialogProps> = ({
    registrationForm,
    formErrors,
    submissionError,
    pending,
    registrationDialogOpen,
    showSnackbar,
    setFormValue,
    setRegistrationDialogOpen,
    setShowSnackbar,
    registerAccount,
    fullScreen,
    enqueueSnackbar
}) => {
    if (showSnackbar) {
        enqueueSnackbar("Account has been successfully registered");
        setShowSnackbar(false);
        setRegistrationDialogOpen(false);
    }

    return (
        <Dialog open={registrationDialogOpen}
                fullScreen={fullScreen}
                fullWidth
                maxWidth="md"
                onClose={() => setRegistrationDialogOpen(false)}
        >
            <DialogTitle>Add wallet</DialogTitle>
            <DialogContent>
                <TextField label="Address"
                           value={registrationForm.address}
                           onChange={event => setFormValue("address", event.target.value)}
                           fullWidth
                           margin="dense"
                           error={Boolean(formErrors.address)}
                           helperText={formErrors.address && formErrors.address}
                />
                <TextField label="Private key"
                           value={registrationForm.privateKey}
                           onChange={event => setFormValue("privateKey", event.target.value)}
                           fullWidth
                           margin="dense"
                           error={Boolean(formErrors.privateKey)}
                           helperText={formErrors.privateKey && formErrors.privateKey}
                           multiline
                />
                {submissionError && (
                    <Typography variant="body1" style={{color: "red"}}>
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined"
                        color="secondary"
                        onClick={() => setRegistrationDialogOpen(false)}
                >
                    Cancel
                </Button>
                <Button variant="contained"
                        color="primary"
                        onClick={registerAccount}
                        disabled={pending}
                >
                    Register
                </Button>
                {pending && <CircularProgress color="primary" size={15}/>}
            </DialogActions>
        </Dialog>
    )
};

const mapMobxToProps = (state: IAppState): AccountRegistrationDialogMobxProps => ({
    registrationForm: state.registration.registrationForm,
    formErrors: state.registration.formErrors,
    submissionError: state.registration.submissionError,
    showSnackbar: state.registration.showSnackbar,
    pending: state.registration.pending,
    registrationDialogOpen: state.registration.registrationDialogOpen,
    registerAccount: state.registration.registerAccount,
    setRegistrationDialogOpen: state.registration.setRegistrationDialogOpen,
    setFormValue: state.registration.setField,
    setShowSnackbar: state.registration.setShowSnackbar
});

export const AccountRegistrationDialog = withMobileDialog()(
    withSnackbar(
        inject(mapMobxToProps)(observer(_AccountRegistrationDialog) as FunctionComponent)
    )
);
