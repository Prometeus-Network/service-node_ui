import {action, computed, observable, reaction} from "mobx";
import {AccountsService} from "../../api";
import {SettingsStore} from "../../Settings";

export class DataOwnersAccountsStore {
    @observable
    dataOwners: string[] = [];

    @observable
    pending: boolean = false;

    @computed
    get selectedDataValidatorAccount(): string | undefined {
        return this.settingsStore.selectedDataValidatorAccount;
    }

    private readonly settingsStore: SettingsStore

    constructor(settingsStore: SettingsStore) {
        this.settingsStore = settingsStore;
        this.fetchDataOwners();

        reaction(
            () => this.selectedDataValidatorAccount,
            () => this.fetchDataOwners()
        )
    }

    @action
    fetchDataOwners = (): void => {
        if (this.selectedDataValidatorAccount) {
            this.pending = true;

            AccountsService.getDataOwnersOfDataValidator(this.selectedDataValidatorAccount)
                .then(({data}) => this.dataOwners = data.dataOwners)
                .finally(() => this.pending = false);
        }
    };

    @action
    addDataOwner = (address: string): void => {
        this.dataOwners.push(address);
    }
}
