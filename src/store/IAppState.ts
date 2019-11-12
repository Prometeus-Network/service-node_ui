import {AccountsStore, AccountsBalanceStore, AccountRegistrationStore} from "../Account/stores";
import {UploadDataStore, AddMetadataDialogStore, EditMetadataDialogStore} from "../DataUpload";
import {DrawerStore} from "../AppBar";
import {SettingsStore} from "../Settings/stores";

export interface IAppState {
    store?: any, //needed for Mobx-router
    dataUpload: UploadDataStore,
    metadataAdding: AddMetadataDialogStore,
    metadataEdit: EditMetadataDialogStore,
    registration: AccountRegistrationStore,
    drawer: DrawerStore,
    settings: SettingsStore,
    accounts: AccountsStore,
    balances: AccountsBalanceStore
}
