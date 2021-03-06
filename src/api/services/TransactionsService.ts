import {AxiosPromise} from "axios";
import {axiosInstance} from "../api-client";
import {TransactionResponse, TransactionType} from "../../models";
import {TRANSACTIONS} from "../endpoints";

export class TransactionsService {

    public static getTransactionsOfAddress(address: string, pagination: {page: number, size: number}): AxiosPromise<TransactionResponse[]> {
        return axiosInstance.get(`/${TRANSACTIONS}/${address}?page=${pagination.page}&size=${pagination.size}`);
    }

    public static getTransactionsOfAddressByType(address: string,
                                                 transactionType: TransactionType,
                                                 pagination: {page: number, size: number}): AxiosPromise<TransactionResponse[]> {
        return axiosInstance.get(`/${TRANSACTIONS}/${address}?page=${pagination.page}&size=${pagination.size}&type=${transactionType}`);
    }
}
