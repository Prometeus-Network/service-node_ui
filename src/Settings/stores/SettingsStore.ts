import {action, computed, observable} from "mobx";
import {AccountResponse} from "../../models";
import {ApiError} from "../../api";
import {AccountsStore} from "../../Account/stores";

export class SettingsStore {
    @observable
    selectedServiceNodeAccount?: string = localStorage.getItem("selectedServiceNodeAccount") !== null
        ? localStorage.getItem("selectedServiceNodeAccount")!
        : undefined;

    @observable
    selectedDataValidatorAccount?: string = localStorage.getItem("selectedDataValidatorAccount") !== null
        ? localStorage.getItem("selectedDataValidatorAccount")!
        : undefined;

    private readonly accountsStore: AccountsStore;

    @computed
    get serviceNodeAccounts(): AccountResponse[] {
        return this.accountsStore.serviceNodeAccounts;
    }

    @computed
    get dataValidatorAccounts(): AccountResponse[] {
        return this.accountsStore.dataValidatorAccounts;
    }

    @computed
    get dataOwnerAccounts(): AccountResponse[] {
        return this.accountsStore.dataOwnerAccounts;
    }

    @computed
    get registeredAccounts(): AccountResponse[] {
        return this.accountsStore.accounts;
    }

    @computed
    get fetchingAccounts(): boolean {
        return this.accountsStore.fetchingAccounts;
    }

    @computed
    get fetchingAccountsError(): ApiError | undefined {
        return this.accountsStore.accountsFetchingError;
    }

    constructor(accountsStore: AccountsStore) {
        this.accountsStore = accountsStore;
    }

    @action
    selectServiceNodeAccount = (accountAddress: string): void => {
        localStorage.setItem("selectedServiceNodeAccount", accountAddress);
        this.selectedServiceNodeAccount = accountAddress;
    };

    @action
    selectDataValidatorAccount = (accountAddress: string): void => {
        localStorage.setItem("selectedDataValidatorAccount", accountAddress);
        this.selectedDataValidatorAccount = accountAddress;
    };
}
