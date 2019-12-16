import {action, computed, observable, reaction} from "mobx";
import {AxiosError} from "axios";
import {TransactionResponse} from "../../models";
import {ApiError, createErrorFromResponse, TransactionsService} from "../../api";
import {SettingsStore} from "../../Settings";
import {Normalized, normalize} from "../../utils";

export class ServiceNodeTransactionsStore {
    private readonly settingsStore: SettingsStore;
    private static readonly PAGE_SIZE = 100;

    @observable
    transactions: Normalized<TransactionResponse> = {};

    @observable
    pending: boolean = false;

    @observable
    error?: ApiError = undefined;

    @observable
    currentPage: number = 0;

    @observable
    showSnackbar: boolean = false;

    @computed
    get serviceNodeAddress(): string | undefined {
        return this.settingsStore.selectedServiceNodeAccount;
    }

    constructor(settingsStore: SettingsStore) {
        this.settingsStore = settingsStore;

        reaction(
            () => this.error,
            () => this.showSnackbar = true
        )
    }

    @action
    fetchTransactions = (): void => {
        if (this.serviceNodeAddress) {
            this.pending = true;
            this.error = undefined;

            TransactionsService.getTransactionsOfAddress(this.serviceNodeAddress, {
                page: this.currentPage,
                size: ServiceNodeTransactionsStore.PAGE_SIZE
            })
                .then(({data}) => {
                    if (data.length !== 0) {
                        this.transactions = {
                            ...this.transactions,
                            ...normalize(data, "hash")
                        };
                        if (data.length === ServiceNodeTransactionsStore.PAGE_SIZE) {
                            this.currentPage = this.currentPage + 1;
                        }
                }
            })
                .catch((error: AxiosError) => this.error = createErrorFromResponse(error))
                .finally(() => this.pending = false);
        }
    };

    @action
    setShowSnackbar = (showSnackbar: boolean): void => {
        this.showSnackbar = showSnackbar;
    };

    @action
    reset = (): void => {
        this.transactions = {};
        this.pending = false;
        this.currentPage = 0;
    }
}
