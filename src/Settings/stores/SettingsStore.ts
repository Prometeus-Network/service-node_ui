import {action, computed, observable} from "mobx";
import {AccountResponse, AccountType} from "../../models";
import {AccountsService} from "../../api/services";
import {ApiError, createErrorFromResponse} from "../../api";
import {AxiosError} from "axios";

export class SettingsStore {
    @observable
    registeredAccounts: AccountResponse[] = [];

    @observable
    fetchingAccounts: boolean = false;

    @observable
    fetchingAccountsError?: ApiError = undefined;

    @observable
    selectedServiceNodeAccount?: string = localStorage.getItem("selectedServiceNodeAccount") !== null
        ? localStorage.getItem("selectedServiceNodeAccount")!
        : undefined;

    @observable
    selectedDataValidatorAccount?: string = localStorage.getItem("selectedDataValidatorAccount") !== null
        ? localStorage.getItem("selectedDataValidatorAccount")!
        : undefined;

    @computed
    get serviceNodeAccounts(): AccountResponse[] {
        return this.registeredAccounts.filter(account => account.type === AccountType.SERVICE_NODE);
    }

    @computed
    get dataValidatorAccounts(): AccountResponse[] {
        return this.registeredAccounts.filter(account => account.type === AccountType.DATA_VALIDATOR);
    }

    @computed
    get dataOwnerAccounts(): AccountResponse[] {
        return this.registeredAccounts.filter(account => account.type === AccountType.DATA_OWNER);
    }

    @action
    fetchAccounts = (): void => {
        this.fetchingAccounts = true;
        this.fetchingAccountsError = undefined;

        AccountsService.fetchRegisteredAccounts()
            .then(({data}) => this.registeredAccounts = data)
            .catch((error: AxiosError) => this.fetchingAccountsError = createErrorFromResponse(error))
            .then(() => this.fetchingAccounts = false);
    };

    @action
    addAccount = (account: AccountResponse): void => {
        this.registeredAccounts.push(account);
    };

    @action
    selectServiceNodeAccount = (accountAddress: string): void => {
        localStorage.setItem("selectedServiceNodeAccount", accountAddress);
        this.selectedServiceNodeAccount = accountAddress;
    };

    @action
    selectDataValidatorAccount = (accountAddress: string): void => {
        localStorage.setItem("selectedDataValidatorAccount", accountAddress);
        this.selectedDataValidatorAccount = accountAddress;
    }
}
