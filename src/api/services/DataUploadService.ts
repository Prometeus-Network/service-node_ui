import {AxiosPromise} from "axios";
import {axiosInstance} from "../api-client";
import {
    UploadDataRequest,
    CreateLocalFileRecordRequest,
    LocalFileRecordResponse,
    UploadFileChunkRequest
} from "../../models";
import {CHUNK, FILES, LOCAL} from "../endpoints";

export class DataUploadService {
    public static uploadData(uploadDataRequest: UploadDataRequest): AxiosPromise<any> {
        return axiosInstance.post(`/${FILES}`, uploadDataRequest);
    }

    public static createLocalFileRecord(creatLocalFileRecordRequest: CreateLocalFileRecordRequest): AxiosPromise<LocalFileRecordResponse> {
        return axiosInstance.post(`/${FILES}/${LOCAL}`, creatLocalFileRecordRequest);
    }

    public static sendFileChunk(fileId: string, uploadChunkRequest: UploadFileChunkRequest): AxiosPromise<{success: boolean}> {
        return axiosInstance.post(`/${FILES}/${LOCAL}/${fileId}/${CHUNK}`, uploadChunkRequest);
    }
}
