import React, {FunctionComponent} from "react";
import {Button, Card, CardContent, CardHeader, CircularProgress, TextField, Typography} from "@material-ui/core";
import {withSnackbar, WithSnackbarProps} from "notistack";
import {ApiError} from "../../api";
import {RegisterAccountResponse} from "../../models";

export interface GenericAccountRegistrationFormOwnProps {
    address: string,
    addressError?: string,
    submissionError?: ApiError,
    response?: RegisterAccountResponse,
    pending: boolean,
    label: string,
    onSubmit: () => void,
    setShowSnackbar: (showSnackBar: boolean) => void,
    onAddressChange: (address: string) => void
}

type GenericAccountRegistrationFormProps = GenericAccountRegistrationFormOwnProps & WithSnackbarProps;

const _GenericAccountRegistrationForm: FunctionComponent<GenericAccountRegistrationFormProps> = ({
    response,
    submissionError,
    pending,
    addressError,
    address,
    label,
    enqueueSnackbar,
    setShowSnackbar,
    onSubmit,
    onAddressChange
}) => {
    if (response) {
        enqueueSnackbar("Account has been created");
        setShowSnackbar(false);
    }

    return (
        <Card>
            <CardHeader title={label}/>
            <CardContent>
                <TextField value={address}
                           error={Boolean(addressError)}
                           helperText={addressError && addressError}
                           onChange={event => onAddressChange(event.target.value as string)}
                           fullWidth
                           margin="dense"
                />
                <Button variant="contained"
                        disabled={pending}
                        onClick={onSubmit}
                >
                    Register account
                </Button>
                {pending && <CircularProgress size={15} color="primary"/>}
                {submissionError && (
                    <Typography variant="body1"
                                style={{color: 'red'}}
                    >
                        {submissionError}
                    </Typography>
                )}
            </CardContent>
        </Card>
    )
};

export const GenericAccountRegistrationForm = withSnackbar(_GenericAccountRegistrationForm);
