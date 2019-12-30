import {IAppState} from "./IAppState";
import {
    AccountRegistrationStore,
    AccountsBalanceStore,
    AccountsStore,
} from "../Account";
import {DrawerStore} from "../AppBar";
import {SettingsStore} from "../Settings";
import {ServiceNodeTransactionsStore, DataUploadsTransactionsStore, DataPurchasesTransactionsStore} from "../Transaction";
import {AccountType} from "../models";

const accounts = new AccountsStore();
const balances = new AccountsBalanceStore(accounts);
const settings = new SettingsStore(accounts);
const registration = new AccountRegistrationStore(accounts, AccountType.DATA_VALIDATOR);
const serviceNodeRegistration = new AccountRegistrationStore(accounts, AccountType.SERVICE_NODE);
const serviceNodeTransactions = new ServiceNodeTransactionsStore(settings);
const dataUploads = new DataUploadsTransactionsStore(settings);
const dataPurchases = new DataPurchasesTransactionsStore(settings);

export const store: IAppState = {
    settings,
    registration,
    drawer: new DrawerStore(),
    accounts,
    balances,
    serviceNodeRegistration,
    serviceNodeTransactions,
    dataPurchases,
    dataUploads
};
