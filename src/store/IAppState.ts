import {UploadDataStore, AddMetadataDialogStore, EditMetadataDialogStore, UploadDataByChunksStore} from "../DataUpload";
import {RegistrationStore} from "../Registration";
import {DrawerStore} from "../AppBar";
import {SettingsStore} from "../Settings/stores";

export interface IAppState {
    store?: any, //needed for Mobx-router
    dataUpload: UploadDataStore,
    metadataAdding: AddMetadataDialogStore,
    metadataEdit: EditMetadataDialogStore,
    registration: RegistrationStore,
    drawer: DrawerStore,
    settings: SettingsStore,
    dataUploadByChunks: UploadDataByChunksStore
}
