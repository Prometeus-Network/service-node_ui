import * as React from "react";
import {inject, observer} from "mobx-react";
import {
    CardHeader,
    Card,
    CardContent,
    TextField,
    Button,
    CircularProgress,
    Grid,
    Typography
} from "@material-ui/core";
import {withSnackbar, WithSnackbarProps} from "notistack";
import {AccountTypeSelect} from "./AccountTypeSelect";
import {AccountType, RegisterAccountRequest} from "../../models";
import {FormErrors} from "../../utils";
import {ApiError, SERVICE_NODE_API_UNREACHABLE_CODE} from "../../api";
import {IAppState} from "../../store";

interface AccountRegistrationFormMobxProps {
    form: Partial<RegisterAccountRequest>,
    setField: (key: keyof RegisterAccountRequest, value: string | AccountType) => void,
    pending: boolean,
    errors: FormErrors<RegisterAccountRequest>,
    registerAccount: () => void,
    submissionError?: ApiError,
    showSnackbar: boolean,
    setShowSnackbar: (showSnackbar: boolean) => void
}

type AccountRegistrationFormInjectedProps = WithSnackbarProps;

type AccountRegistrationFormProps = AccountRegistrationFormMobxProps & AccountRegistrationFormInjectedProps;

const getMessageFromError = (apiError: ApiError): string => {
    if (apiError.status === 400) {
        return "Account with such address has already been registered.";
    } else if (apiError.status === 500) {
        return "Internal server error occurred."
    } else if (apiError.status === SERVICE_NODE_API_UNREACHABLE_CODE) {
        return "Service node is unreachable. Please make sure that it's running."
    } else {
        return "Unknown error occurred when tried to register account."
    }
};

const _AccountRegistrationForm: React.FC<AccountRegistrationFormProps> = ({
    errors,
    submissionError,
    pending,
    form,
    registerAccount,
    setField,
    enqueueSnackbar,
    showSnackbar,
    setShowSnackbar
}) => {
    if (showSnackbar) {
        enqueueSnackbar("Account has been registered");
        setShowSnackbar(false);
    }

    return (
        <Card>
            <CardHeader title="Account registration"/>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField value={form.address}
                                   label="Address"
                                   onChange={event => setField("address", event.target.value)}
                                   error={Boolean(errors.address)}
                                   helperText={errors.address && errors.address}
                                   fullWidth
                                   margin="dense"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AccountTypeSelect onSelect={type => setField("type", type)}
                                           selectedValue={form.type}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={registerAccount}
                                variant="contained"
                                color="primary"
                                disabled={pending}
                        >
                            Register account
                        </Button>
                        {pending && <CircularProgress size={25} color="primary"/>}
                        {submissionError && (
                            <Typography variant="body1" style={{color: 'red'}}>
                                {getMessageFromError(submissionError)}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const mapMobxToProps = (state: IAppState): AccountRegistrationFormMobxProps => {
    const registration = state.registration;

    return {
        errors: registration.formErrors,
        form: registration.registrationForm,
        pending: registration.pending,
        registerAccount: registration.registerAccount,
        setField: registration.setField,
        submissionError: registration.submissionError,
        showSnackbar: registration.showSnackbar,
        setShowSnackbar: registration.setShowSnackbar
    }
};

export const AccountRegistrationForm = withSnackbar(
    inject(mapMobxToProps)(observer(_AccountRegistrationForm)) as React.FC<any>
);
