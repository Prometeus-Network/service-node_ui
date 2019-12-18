import {action, computed, observable, reaction} from "mobx";
import {AxiosError} from "axios";
import {TransactionResponse, TransactionType} from "../../models";
import {ApiError, createErrorFromResponse, TransactionsService} from "../../api";
import {SettingsStore} from "../../Settings";
import {normalize, Normalized} from "../../utils";

export class DataPurchasesTransactionsStore {
    private readonly settingsStore: SettingsStore;
    private static readonly PAGE_SIZE = 100;

    @observable
    transactions: Normalized<TransactionResponse> = {};

    @observable
    pending: boolean = false;

    @observable
    currentPage: number = 0;

    @observable
    error?: ApiError = undefined;

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
                    this.currentPage = 0;
                    this.fetchPurchasesHistory();
                }
            }
        )
    }

    @action
    fetchPurchasesHistory = (): void => {
        if (this.serviceNodeAccount) {
            this.pending = true;
            this.error = undefined;

            TransactionsService.getTransactionsOfAddressByType(
                this.serviceNodeAccount,
                TransactionType.DATA_PURCHASE,
                {page: this.currentPage, size: DataPurchasesTransactionsStore.PAGE_SIZE}
            )
                .then(({data}) => {
                    if (data.length !== 0) {
                        this.transactions = {
                            ...this.transactions,
                            ...normalize(data, "hash")
                        };

                        if (data.length === DataPurchasesTransactionsStore.PAGE_SIZE) {
                            this.currentPage = this.currentPage + 1;
                        }
                    }
                })
                .catch((error: AxiosError) => this.error = createErrorFromResponse(error))
                .finally(() => this.pending = false);
        }
    }
}
