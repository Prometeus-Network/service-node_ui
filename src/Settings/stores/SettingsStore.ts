import {action, computed} from "mobx";
import {AccountsService, ApiError} from "../../api";
import {AccountResponse} from "../../models";
import {AccountsStore} from "../../Account";

export class SettingsStore {
    private readonly accountsStore: AccountsStore;

    @computed
    get selectedServiceNodeAccount(): string | undefined{
        if (this.accountsStore.accounts.length !== 0) {
            return this.accountsStore.accounts
                .filter(account => account.default)
                .reduce(account => account)
                .address
        } else {
            return undefined;
        }
    }

    @computed
    get serviceNodeAccounts(): AccountResponse[] {
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
        AccountsService.setAccountAsDefault(accountAddress)
            .then(() => {
                this.accountsStore.setDefaultAccount(accountAddress);
            })
    };
}
