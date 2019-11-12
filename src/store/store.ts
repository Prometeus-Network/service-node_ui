import {AccountsStore, AccountsBalanceStore, AccountRegistrationStore} from "../Account/stores";
import {IAppState} from "./IAppState";
import {UploadDataStore, AddMetadataDialogStore, EditMetadataDialogStore} from "../DataUpload";
import {DrawerStore} from "../AppBar";
import {SettingsStore} from "../Settings/stores";

const accounts = new AccountsStore();
const balances = new AccountsBalanceStore(accounts);
const settings = new SettingsStore(accounts);
const dataUpload = new UploadDataStore(settings);
const registration = new AccountRegistrationStore(accounts);

export const store: IAppState = {
    dataUpload,
    settings,
    metadataAdding: new AddMetadataDialogStore(),
    metadataEdit: new EditMetadataDialogStore(),
    registration,
    drawer: new DrawerStore(),
    accounts,
    balances
};
