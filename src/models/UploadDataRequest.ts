export interface UploadDataRequest {
    data: string,
    name: string,
    dataOwnerAddress: string,
    dataValidatorAddress: string,
    serviceNodeAddress: string,
    additional: Map<string, string>,
    keepUntil: Date,
    mimeType: string,
    extension: string,
    size: number
}
