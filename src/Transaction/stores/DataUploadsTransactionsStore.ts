import {action, computed, observable, reaction} from "mobx";
import {AxiosError} from "axios";
import {SettingsStore} from "../../Settings";
import {TransactionResponse, TransactionType} from "../../models";
import {ApiError, createErrorFromResponse, TransactionsService} from "../../api";
import {normalize, Normalized} from "../../utils";

export class DataUploadsTransactionsStore {
    private readonly settingsStore: SettingsStore;
    private static readonly PAGE_SIZE: number = 50;

    @observable
    transactions: Normalized<TransactionResponse> = {};

    @observable
    error?: ApiError = undefined;

    @observable
    pending: boolean = false;

    @observable
    currentPage: number = 0;

    @observable
    resetOnSelectedServiceNodeAccountChange: boolean = false;

    @computed
    get serviceNodeAccount(): string | undefined {
        return this.settingsStore.selectedServiceNodeAccount;
    }

    constructor(settingsStore: SettingsStore) {
        this.settingsStore = settingsStore;

        reaction(
            () => this.serviceNodeAccount,
            () => {
                if (this.resetOnSelectedServiceNodeAccountChange) {
                    this.reset();
                    this.fetchDataUploadsHistory();
                }
            }
        )
    }

    @action
    setResetOnSelectedServiceNodeAccountChange = (reset: boolean): void => {
        this.resetOnSelectedServiceNodeAccountChange = reset;
    };

    @action
    fetchDataUploadsHistory = (): void => {
        if (this.serviceNodeAccount) {
            this.pending = true;
            this.error = undefined;

            TransactionsService.getTransactionsOfAddressByType(
                this.serviceNodeAccount,
                TransactionType.DATA_UPLOAD,
                {page: this.currentPage, size: DataUploadsTransactionsStore.PAGE_SIZE}
            )
                .then(({data}) => {
                    if (data.length !== 0) {
                        this.transactions = {
                            ...this.transactions,
                            ...normalize(data, "hash")
                        };

                        if (data.length === DataUploadsTransactionsStore.PAGE_SIZE) {
                            this.currentPage = this.currentPage + 1;
                        }
                    }
                })
                .catch((error: AxiosError) => this.error = createErrorFromResponse(error))
                .finally(() => this.pending = false);
        }
    };

    @action
    reset = (): void => {
        this.currentPage = 0;
        this.pending = false;
        this.error = undefined;
        this.transactions = {};
    }
}
