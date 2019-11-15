import {IAppState} from "./IAppState";
import {
    AccountsStore,
    AccountsBalanceStore,
    AccountRegistrationStore,
    DataOwnersAccountsStore,
    CreateDataOwnerStore
} from "../Account";
import {UploadDataStore, AddMetadataDialogStore, EditMetadataDialogStore, DataOwnerSelectStore} from "../DataUpload";
import {DrawerStore} from "../AppBar";
import {SettingsStore} from "../Settings";

const accounts = new AccountsStore();
const balances = new AccountsBalanceStore(accounts);
const settings = new SettingsStore(accounts);
const dataUpload = new UploadDataStore(settings);
const registration = new AccountRegistrationStore(accounts);
const dataOwners = new DataOwnersAccountsStore(accounts);
const dataOwnerSelect = new DataOwnerSelectStore(dataOwners, settings);
const createDataOwner = new CreateDataOwnerStore(settings, dataOwners);

export const store: IAppState = {
    dataUpload,
    settings,
    metadataAdding: new AddMetadataDialogStore(),
    metadataEdit: new EditMetadataDialogStore(),
    registration,
    drawer: new DrawerStore(),
    accounts,
    balances,
    dataOwners,
    dataOwnerSelect,
    createDataOwner
};
