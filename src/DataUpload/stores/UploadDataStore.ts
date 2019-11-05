import {action, computed, observable, reaction} from "mobx";
import {AxiosError} from "axios";
import {addMonths} from "date-fns";
import {validateData, validateFileName} from "../validation";
import {ApiError, createErrorFromResponse, DataUploadService, EncryptorService} from "../../api";
import {EncryptFileResponse, GenerateRsaKeyPairResponse, UploadDataRequest, UploadDataResponse} from "../../models";
import {
    FormErrors,
    getFileExtension,
    getFileMimeType,
    getFileSizeInBytes,
    isStringEmpty,
    validateEthereumAddress
} from "../../utils";
import {SettingsStore} from "../../Settings/stores";

const UPLOAD_DATA_FORM_INITIAL_STATE =  {
    data: "",
    additional: new Map<string, string>(),
    dataOwnerAddress: undefined,
    name: undefined,
    keepUntil: addMonths(new Date(), 1)
};

const UPLOAD_DATA_FORM_ERRORS_INITIAL_STATE = {
    data: undefined,
    additional: undefined,
    dataOwnerAddress: undefined,
    name: undefined,
    keepUntil: undefined,
    extension: undefined,
    mimeType: undefined,
    size: undefined,
    dataValidatorAddress: undefined,
    serviceNodeAddress: undefined
};

export class UploadDataStore {
    @observable
    uploadDataForm: Partial<UploadDataRequest> = UPLOAD_DATA_FORM_INITIAL_STATE;

    @observable
    attachedFileName?: string;

    @observable
    fileSize: number = 0;

    @observable
    extension: string = "";

    @observable
    mimeType: string = "";

    @observable
    errors: FormErrors<UploadDataRequest> = UPLOAD_DATA_FORM_ERRORS_INITIAL_STATE;

    @observable
    response?: UploadDataResponse;

    @observable
    pending: boolean = false;

    @observable
    submissionError?: ApiError;

    @observable
    generatedKeyPair?: GenerateRsaKeyPairResponse;

    @observable
    settingsStore: SettingsStore;

    @computed
    get serviceNodeAccount(): string | undefined {
        return this.settingsStore.selectedServiceNodeAccount;
    }

    @computed
    get dataValidatorAccount(): string | undefined {
        return this.settingsStore.selectedDataValidatorAccount;
    }

    constructor(settingsStore: SettingsStore) {
        this.settingsStore = settingsStore;

        reaction(
            () => this.uploadDataForm.name,
            name => this.errors.name = validateFileName(name)
        );

        reaction(
            () => this.uploadDataForm.dataOwnerAddress,
            address => this.errors.dataOwnerAddress = validateEthereumAddress(address)
        );

        reaction(
            () => this.uploadDataForm.data,
            data => {
                if (data && !isStringEmpty(data)) {
                    this.fileSize = getFileSizeInBytes(data);
                    this.extension = getFileExtension(data);
                    this.mimeType = getFileMimeType(data);
                }
            }
        )
    }

    @action
    setField = (key: keyof UploadDataRequest, value: string | number | Map<string, string> | Date): void => {
        this.uploadDataForm = {
            ...this.uploadDataForm,
            [key]: value
        }
    };

    @action
    setAdditionalField = (additionalFieldName: string, value: string): void => {
        this.uploadDataForm.additional!.set(additionalFieldName, value);
    };

    @action
    removeAdditionalField = (additionalFieldName: string): void => {
        this.uploadDataForm.additional!.delete(additionalFieldName);
    };

    @action
    setAttachedFileName = (fileName: string): void => {
        this.attachedFileName = fileName;
    };

    @action
    uploadData = (): Promise<void> => {
        if (this.isFormValid()) {
            this.submissionError = undefined;
            this.response = undefined;
            this.pending = true;
            return new Promise<void>(async resolve => {
                try {
                    //this.generatedKeyPair = await this.generateKeyPair();
                    //const encryptedData = await this.encryptFile(this.uploadDataForm.data!, this.generatedKeyPair.public_key);

                    await DataUploadService.uploadData({
                        data: this.uploadDataForm.data!.substring(this.uploadDataForm.data!.indexOf(";base64,") + ";base64,".length),
                        additional: this.uploadDataForm.additional!,
                        dataOwnerAddress: this.uploadDataForm.dataOwnerAddress!,
                        name: this.uploadDataForm.name!,
                        keepUntil: this.uploadDataForm.keepUntil!,
                        size: this.fileSize,
                        mimeType: this.mimeType,
                        extension: this.extension,
                        serviceNodeAddress: this.serviceNodeAccount!,
                        dataValidatorAddress: this.dataValidatorAccount!
                    })
                        .then(({data}) => this.response = data)
                        .catch((error: AxiosError) => this.submissionError = createErrorFromResponse(error));
                    this.pending = false;
                    resolve();
                } catch (error) {
                    this.submissionError = {
                        message: "Something went wrong",
                        status: 500
                    };
                    this.pending = false;
                    resolve();
                }
            })
        } else return new Promise<void>(resolve => resolve());
    };

    private generateKeyPair = (): Promise<GenerateRsaKeyPairResponse> => {
        return new Promise<GenerateRsaKeyPairResponse>((resolve, reject) => {
            EncryptorService.generateRsaKeyPair()
                .then(({data}) => resolve(data.result))
                .catch(error => reject(error));
        })
    };

    private encryptFile = (base64Data: string, publicKey: string): Promise<EncryptFileResponse> => {
        return new Promise<EncryptFileResponse>((resolve, reject) => {
            EncryptorService.encryptFile({
                content: base64Data,
                public_key: publicKey
            })
                .then(({data}) => resolve(data.result))
                .catch(error => reject(error));
        })
    };

    @action
    isFormValid = (): boolean => {
        const {dataOwnerAddress, name, data} = this.uploadDataForm;
        this.errors = {
            name: validateFileName(name),
            dataOwnerAddress: validateEthereumAddress(dataOwnerAddress),
            data: validateData(data),
            additional: undefined,
            keepUntil: undefined,
            extension: undefined,
            mimeType: undefined,
            size: undefined,
            dataValidatorAddress: undefined,
            serviceNodeAddress: undefined
        };

        return !Boolean(this.errors.name || this.errors.dataOwnerAddress);
    };

    @action
    reset = (): void => {
        this.uploadDataForm = UPLOAD_DATA_FORM_INITIAL_STATE;
        this.response = undefined;
        this.pending = false;
        this.attachedFileName = undefined;
        this.fileSize = 0;
        this.extension = "";
        this.mimeType = "";
        this.submissionError = undefined;
        this.errors = UPLOAD_DATA_FORM_ERRORS_INITIAL_STATE;
    }
}
