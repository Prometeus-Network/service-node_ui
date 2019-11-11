import {AxiosPromise} from "axios";
import {axiosInstance} from "../api-client";
import {
    UploadDataRequest,
    UploadDataResponse,
    CreateLocalFileRecordRequest,
    LocalFileRecordResponse,
    UploadFileChunkRequest,
    DdsFileUploadCheckResponse
} from "../../models";
import {CHUNK, FILES, IS_FULLY_UPLOADED, LOCAL, TO_DDS} from "../endpoints";

export class DataUploadService {
    public static uploadData(uploadDataRequest: UploadDataRequest): AxiosPromise<any> {
        return axiosInstance.post(`/${FILES}`, uploadDataRequest);
    }

    public static createLocalFileRecord(creatLocalFileRecordRequest: CreateLocalFileRecordRequest): AxiosPromise<LocalFileRecordResponse> {
        return axiosInstance.post(`/${FILES}/${LOCAL}`, creatLocalFileRecordRequest);
    }

    public static sendFileChunk(localFileId: string, uploadChunkRequest: UploadFileChunkRequest): AxiosPromise<{success: boolean}> {
        return axiosInstance.post(`/${FILES}/${LOCAL}/${localFileId}/${CHUNK}`, uploadChunkRequest);
    }

    public static uploadLocalFileToDds(localFileId: string): AxiosPromise<{success: boolean}> {
        return axiosInstance.post(`/${FILES}/${LOCAL}/${localFileId}/${TO_DDS}`);
    }

    public static checkIfLocalFileUploadToDds(localFileId: string): AxiosPromise<DdsFileUploadCheckResponse> {
        return axiosInstance.get(`/${FILES}/${LOCAL}/${localFileId}/${IS_FULLY_UPLOADED}`);
    }

    public static deleteLocalFile(localFileId: string): AxiosPromise<void> {
        return axiosInstance.delete(`/${FILES}/${LOCAL}/${localFileId}`);
    }
}
