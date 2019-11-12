import {AxiosPromise} from "axios";
import {axiosInstance} from "../api-client";
import {ACCOUNTS, BALANCE} from "../endpoints";
import {AccountResponse, RegisterAccountRequest, RegisterAccountResponse, BalanceResponse} from "../../models";

export class AccountsService {
    public static registerAccount(registerAccountRequest: RegisterAccountRequest): AxiosPromise<RegisterAccountResponse> {
        return axiosInstance.post(`/${ACCOUNTS}`, registerAccountRequest)
    }

    public static fetchRegisteredAccounts(): AxiosPromise<AccountResponse[]> {
        return axiosInstance.get(`/${ACCOUNTS}`);
    }

    public static getBalanceOfAccount(address: string): AxiosPromise<BalanceResponse> {
        return axiosInstance.get(`/${ACCOUNTS}/${address}/${BALANCE}`);
    }
}
