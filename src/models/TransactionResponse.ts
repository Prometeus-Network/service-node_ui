import {TransactionType} from "./TransactionType";

export interface TransactionResponse {
    id: string,
    hash: string,
    value: number,
    dataValidator: string,
    dataMart: string,
    dataOwner: string,
    blockNumber: number,
    queueNumber: number,
    status: boolean,
    serviceNode: string,
    created_at: string,
    type: TransactionType
}
