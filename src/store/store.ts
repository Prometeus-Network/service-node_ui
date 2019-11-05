import {IAppState} from "./IAppState";
import {UploadDataStore, AddMetadataDialogStore, EditMetadataDialogStore, UploadDataByChunksStore} from "../DataUpload";
import {RegistrationStore} from "../Registration";
import {DrawerStore} from "../AppBar";
import {SettingsStore} from "../Settings/stores";

const settings = new SettingsStore();
const dataUpload = new UploadDataStore(settings);
const dataUploadByChunks = new UploadDataByChunksStore(settings);

export const store: IAppState = {
    dataUpload,
    settings,
    dataUploadByChunks,
    metadataAdding: new AddMetadataDialogStore(),
    metadataEdit: new EditMetadataDialogStore(),
    registration: new RegistrationStore(),
    drawer: new DrawerStore()
};
