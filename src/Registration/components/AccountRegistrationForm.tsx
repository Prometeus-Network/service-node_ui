import * as React from "react";
import {inject, observer} from "mobx-react";
import {
    CardHeader,
    Card,
    CardContent,
    TextField,
    Button,
    CircularProgress
} from "@material-ui/core";
import {AccountTypeSelect} from "./AccountTypeSelect";
import {AccountType, RegisterAccountRequest} from "../../models";
import {FormErrors} from "../../utils";
import {ApiError} from "../../api";
import {IAppState} from "../../store";

interface AccountRegistrationFormProps {
    form: Partial<RegisterAccountRequest>,
    setField: (key: keyof RegisterAccountRequest, value: string | AccountType) => void,
    pending: boolean,
    errors: FormErrors<RegisterAccountRequest>,
    registerAccount: () => void,
    submissionError?: ApiError
}

const _AccountRegistrationForm: React.FC<AccountRegistrationFormProps> = ({
    errors,
    submissionError,
    pending,
    form,
    registerAccount,
    setField
}) => (
    <Card>
        <CardHeader title="Account registration"/>
        <CardContent>
            <TextField value={form.address}
                       label="Address"
                       onChange={event => setField("address", event.target.value)}
                       error={Boolean(errors.address)}
                       helperText={errors.address && errors.address}
                       fullWidth
                       margin="dense"
            />
            <AccountTypeSelect onSelect={type => setField("type", type)}
                               selectedValue={form.type}
            />
            <Button onClick={registerAccount}
                    variant="contained"
                    color="primary"
                    disabled={pending}
            >
                Register account
            </Button>
            {pending && <CircularProgress size={15} color="primary"/>}
        </CardContent>
    </Card>
);

const mapMobxToProps = (state: IAppState): AccountRegistrationFormProps => {
    const registration = state.registration;

    return {
        errors: registration.formErrors,
        form: registration.registrationForm,
        pending: registration.pending,
        registerAccount: registration.registerAccount,
        setField: registration.setField,
        submissionError: registration.submissionError
    }
};

export const AccountRegistrationForm = inject(mapMobxToProps)(observer(_AccountRegistrationForm)) as React.FC<any>;
