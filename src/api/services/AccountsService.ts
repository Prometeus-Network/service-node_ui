import {AxiosPromise} from "axios";
import {axiosInstance} from "../api-client";
import {ACCOUNT} from "../endpoints";
import {AccountResponse, RegisterAccountRequest, RegisterAccountResponse} from "../../models";

export class AccountsService {
    public static registerAccount(registerAccountRequest: RegisterAccountRequest): AxiosPromise<RegisterAccountResponse> {
        return axiosInstance.post(`/${ACCOUNT}`, registerAccountRequest)
    }

    public static fetchRegisteredAccounts(): AxiosPromise<AccountResponse[]> {
        return axiosInstance.get(`/${ACCOUNT}`);
    }
}
