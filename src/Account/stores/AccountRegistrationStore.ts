import {action, observable, reaction} from "mobx";
import {AxiosError} from "axios";
import Web3 from "web3";
import {AccountsStore} from "./AccountsStore";
import {validateAccountType, validatePrivateKey} from "../validation";
import {FormErrors, validateEthereumAddress} from "../../utils";
import {AccountsService, ApiError, createErrorFromResponse} from "../../api";
import {AccountType, RegisterAccountRequest, RegisterAccountResponse} from "../../models";

export class AccountRegistrationStore {
    @observable
    registrationForm: Partial<RegisterAccountRequest> = {
        address: undefined,
        type: AccountType.SERVICE_NODE
    };

    @observable
    formErrors: FormErrors<RegisterAccountRequest> = {
        type: undefined,
        address: undefined,
        privateKey: undefined
    };

    @observable
    pending: boolean = false;

    @observable
    submissionError?: ApiError = undefined;

    @observable
    response?: RegisterAccountResponse = undefined;

    @observable
    showSnackbar: boolean = false;

    @observable
    registrationDialogOpen: boolean = false;

    private readonly accountsStore: AccountsStore;
    private readonly web3: Web3;

    constructor(accountsStore: AccountsStore, web3: Web3) {
        this.accountsStore = accountsStore;
        this.web3 = web3;

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
            this.submissionError = undefined;

            AccountsService.registerAccount({
                address: this.registrationForm.address!,
                type: this.registrationForm.type!,
                privateKey: this.registrationForm.privateKey!
            })
                .then(({data}) => {
                    this.accountsStore.addAccount({
                        type: this.registrationForm.type!,
                        address: this.registrationForm.address!,
                        default: false
                    });
                    this.response = data;
                    this.setShowSnackbar(true);
                })
                .catch((error: AxiosError) => this.submissionError = createErrorFromResponse(error))
                .then(() => this.pending = false)
        }
    };

    @action
    isFormValid = (): boolean => {
        this.formErrors.address = validateEthereumAddress(this.registrationForm.address);

        if (!this.formErrors.address) {
            this.formErrors = {
                address: this.formErrors.address,
                privateKey: validatePrivateKey(
                    this.registrationForm.address!,
                    this.web3,
                    this.registrationForm.privateKey
                ),
                type: validateAccountType(this.registrationForm.type)
            }
        }

        return !(Boolean(this.formErrors.address || this.formErrors.type || this.formErrors.privateKey))

    };

    @action
    setShowSnackbar = (showSnackbar: boolean): void => {
        this.showSnackbar = showSnackbar;
    };

    @action
    setRegistrationDialogOpen = (registrationDialogOpen: boolean): void => {
        this.registrationDialogOpen = registrationDialogOpen;
    };

    @action
    reset = (): void => {
        this.registrationForm = {
            address: undefined,
            type: AccountType.DATA_VALIDATOR
        };
        this.formErrors = {
            address: undefined,
            type: undefined,
            privateKey: undefined
        };
        this.submissionError = undefined;
        this.showSnackbar = false;
    }
}
