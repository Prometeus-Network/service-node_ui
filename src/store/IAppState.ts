import {
    AccountsStore,
    AccountsBalanceStore,
    AccountRegistrationStore,
} from "../Account";
import {DrawerStore} from "../AppBar";
import {SettingsStore} from "../Settings";
import {ServiceNodeTransactionsStore, DataUploadsTransactionsStore, DataPurchasesTransactionsStore} from "../Transaction";

export interface IAppState {
    store?: any, //needed for Mobx-router
    registration: AccountRegistrationStore,
    drawer: DrawerStore,
    settings: SettingsStore,
    accounts: AccountsStore,
    balances: AccountsBalanceStore,
    serviceNodeTransactions: ServiceNodeTransactionsStore,
    dataUploads: DataUploadsTransactionsStore,
    dataPurchases: DataPurchasesTransactionsStore
}
