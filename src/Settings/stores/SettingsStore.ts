import {action, computed, observable} from "mobx";
import {AccountResponse} from "../../models";
import {ApiError} from "../../api";
import {AccountsStore} from "../../Account";

export class SettingsStore {
    private readonly accountsStore: AccountsStore;

    @observable
    selectedServiceNodeAccount?: string = localStorage.getItem("selectedServiceNodeAccount") !== null
        ? localStorage.getItem("selectedServiceNodeAccount")!
        : undefined;

    @computed
    get serviceNodeAccounts(): AccountResponse[] {
        return this.accountsStore.serviceNodeAccounts;
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
}
