import {action, observable, reaction} from "mobx";
import {validateAccountType, validatePrivateKey} from "../validation";
import {validateEthereumAddress} from "../../utils";
import {createErrorFromResponse, ApiError, AccountsService} from "../../api";
import {AccountType, RegisterAccountRequest, RegisterAccountResponse} from "../../models";
import {FormErrors} from "../../utils";
import {AxiosError} from "axios";

export class RegistrationStore {
    @observable
    registrationForm: Partial<RegisterAccountRequest> = {
        address: undefined,
        type: AccountType.DATA_VALIDATOR
    };

    @observable
    formErrors: FormErrors<RegisterAccountRequest> = {
        type: undefined,
        address: undefined
    };

    @observable
    pending: boolean = false;

    @observable
    submissionError?: ApiError = undefined;

    @observable
    response?: RegisterAccountResponse = undefined;

    constructor() {
        reaction(
            () => this.registrationForm.type,
            type => this.formErrors.type = validateAccountType(type)
        );

        reaction(
            () => this.registrationForm.address,
            address => this.formErrors.address = validateEthereumAddress(address)
        );
    }

    @action
    setField = (key: keyof RegisterAccountRequest, value: string | AccountType): void => {
        this.registrationForm = {
            ...this.registrationForm,
            [key]: value
        }
    };

    @action
    registerAccount = (): void => {
        if (this.isFormValid()) {
            this.pending = true;

            AccountsService.registerAccount({
                address: this.registrationForm.address!,
                type: this.registrationForm.type!,
            })
                .then(({data}) => this.response = data)
                .catch((error: AxiosError) => this.submissionError = createErrorFromResponse(error))
                .then(() => this.pending = false)
        }
    };

    @action
    isFormValid = (): boolean => {
        this.formErrors = {
            address: validateEthereumAddress(this.registrationForm.address),
            type: validateAccountType(this.registrationForm.type)
        };

        return !(Boolean(this.formErrors.address || this.formErrors.type))
    }
}
