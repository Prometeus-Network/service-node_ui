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

        setInterval(this.fetchDataValidatorBalances, 10000);
        setInterval(this.fetchServiceNodeBalances, 10000);
    }

    @action
    fetchServiceNodeBalances = (): void => {
        this.accountsStore.serviceNodeAccounts.forEach(account => {
            AccountsService.getBalanceOfAccount(account.address)
                .then(({data}) => {
                    this.accountsBalances = {
                        ...this.accountsBalances,
                        [account.address]: data.balance
                    }
                })
                .catch(ignored => {});
        });
    };

    @action
    fetchDataValidatorBalances = (): void => {
        this.accountsStore.dataValidatorAccounts.forEach(account => {
            AccountsService.getBalanceOfAccount(account.address)
                .then(({data}) => {
                    this.accountsBalances = {
                        ...this.accountsBalances,
                        [account.address]: data.balance
                    }
                })
                .catch(ignored => {})
        });
    }
}
