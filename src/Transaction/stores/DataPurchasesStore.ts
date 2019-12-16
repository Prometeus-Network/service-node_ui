import {observable, action, computed} from "mobx";
import {AxiosError} from "axios";
import {TransactionResponse} from "../../models";
import {createErrorFromResponse, TransactionsService, ApiError} from "../../api";
import {SettingsStore} from "../../Settings/stores";

export class DataPurchasesStore {
    private readonly settingsStore: SettingsStore;

    @observable
    transactions: TransactionResponse[] = [];

    @observable
    pending: boolean = false;

    @observable
    error?: ApiError = undefined;

    @observable
    serviceNodeAccount?: string = undefined;

    @computed
    get defaultServiceNodeAccount(): string | undefined {
        return this.settingsStore.selectedServiceNodeAccount;
    }

    constructor(settingsStore: SettingsStore) {
        this.settingsStore = settingsStore;
    }
}
