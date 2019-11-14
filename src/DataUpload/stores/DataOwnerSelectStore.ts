import {action, reaction, computed, observable} from "mobx";
import {DataOwnersAccountsStore} from "../../Account";

export class DataOwnerSelectStore {
    private readonly dataOwnersAccounts: DataOwnersAccountsStore;

    @observable
    selectedDataOwner?: string;

    @computed
    get pending(): boolean {
        return this.dataOwnersAccounts.pending;
    }

    @computed
    get dataOwners(): string[] {
        return this.dataOwnersAccounts.dataOwners;
    }

    constructor(dataOwnersAccounts: DataOwnersAccountsStore) {
        this.dataOwnersAccounts = dataOwnersAccounts;

        reaction(
            () => this.dataOwners,
            () => this.selectedDataOwner = undefined
        )
    }

    @action
    setSelectedDataOwner = (selectedDataOwner: string): void => {
        this.selectedDataOwner = selectedDataOwner;
    }
}
