import {action, computed, observable} from "mobx";
import {AccountsStore} from "./AccountsStore";
import {AccountBalanceMapping} from "../../models";
import {createErrorFromResponse, ApiError, AccountsService} from "../../api";

export class AccountsBalanceStore {
    @observable
    accountsBalances: AccountBalanceMapping = {};

    private readonly accountsStore: AccountsStore;

    constructor(accountsStore: AccountsStore) {
        this.accountsStore = accountsStore;

        setInterval(this.fetchBalancesOfAllAccounts, 10000);
    }

    @action
    fetchBalancesOfAllAccounts = (): void => {
        AccountsService.getBalancesOfAllAccounts()
            .then(({data}) => this.accountsBalances = {...this.accountsBalances, ...data})
            .catch(ignored => {});
    };
}
