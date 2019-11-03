import {AxiosPromise} from "axios";
import {axiosInstance} from "../api-client";
import {UploadDataRequest} from "../../models";
import {UPLOAD_DATA} from "../endpoints";

export class DataUploadService {
    public static uploadData(uploadDataRequest: UploadDataRequest): AxiosPromise<any> {
        return axiosInstance.post(`/${UPLOAD_DATA}`, uploadDataRequest);
    }
}
