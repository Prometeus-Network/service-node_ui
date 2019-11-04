import * as React from "react";
import {inject, observer} from "mobx-react";
import {
    Card,
    CardContent,
    CardHeader,
    Button,
    TextField,
    CircularProgress,
    Grid,
    Typography
} from "@material-ui/core";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {Base64EncodingFileInput} from "./Base64EncodingFileInput";
import {EditableMetadataTable} from "./EditableMetadataTable";
import {UploadDataRequest, UploadDataResponse} from "../../models";
import {CopyToClipboardButton} from "../../CopyToClipboardButton";
import {FormErrors} from "../../utils";
import {ApiError, SERVICE_NODE_API_UNREACHABLE_CODE} from "../../api";
import {IAppState} from "../../store";

interface UploadDataFormProps {
    uploadDataForm: Partial<UploadDataRequest>,
    errors: FormErrors<UploadDataRequest>,
    pending: boolean,
    uploadData: () => void,
    reset: () => void,
    setFormValue: (key: keyof UploadDataRequest, value: string | number | Map<string, string> | Date) => void,
    setAdditionalMetaField: (fieldName: string, fieldValue: string) => void,
    submissionError?: ApiError,
    setAttachedFileName: (fileName: string) => void,
    fileName?: string,
    response?: UploadDataResponse,
    serviceNodeAccount?: string,
    dataValidatorAccount?: string
}

const getMessageFromError = (apiError: ApiError): string => {
    if (apiError.status === SERVICE_NODE_API_UNREACHABLE_CODE) {
        return "Service node API is unreachable. Please ensure that it's running."
    }

    return "Unknown error occurred when tried to upload file";
};

const _UploadDataForm: React.FC<UploadDataFormProps> = ({
    errors,
    uploadData,
    pending,
    setAdditionalMetaField,
    setFormValue,
    submissionError,
    uploadDataForm,
    setAttachedFileName,
    fileName,
    response,
    reset,
    serviceNodeAccount,
    dataValidatorAccount
}) => {
    const content = response
        ? (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        You have successfully uploaded file
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        Uploaded file id is {response.id} <CopyToClipboardButton textToCopy={response.id}/>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        Storage price is {response.price} ETH
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="text"
                            onClick={reset}
                    >
                        Upload another file
                    </Button>
                </Grid>
            </Grid>
        )
        : (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        Selected service node account is {serviceNodeAccount}.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        Selected data validator account is {dataValidatorAccount}.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        You can change them is settings.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={uploadDataForm.name || ""}
                               onChange={event => setFormValue('name', event.target.value)}
                               error={Boolean(errors.name)}
                               helperText={errors.name && errors.name}
                               label="Name"
                               margin="dense"
                               fullWidth
                    />
                    <TextField value={uploadDataForm.dataOwnerAddress || ""}
                               onChange={event => setFormValue('dataOwnerAddress', event.target.value)}
                               error={Boolean(errors.dataOwnerAddress)}
                               helperText={errors.dataOwnerAddress && errors.dataOwnerAddress}
                               label="Data owner address"
                               margin="dense"
                               fullWidth
                    />
                    <KeyboardDatePicker value={uploadDataForm.keepUntil}
                                        onChange={date => setFormValue("keepUntil", date as Date)}
                                        disablePast
                                        autoOk
                                        format="dd/MM/yyyy"
                                        label="Keep until"
                                        fullWidth
                                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12}>
                    <EditableMetadataTable/>
                </Grid>
                <Grid item xs={12}>
                    <Base64EncodingFileInput onFileProcessed={base64Data => setFormValue('data', base64Data)}
                                             onFileAttached={fileName => setAttachedFileName(fileName)}
                                             fileName={fileName}
                    />
                    {errors.data && <Typography variant="body1" style={{color: 'red'}}>{errors.data}</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained"
                            color="primary"
                            disabled={pending}
                            onClick={uploadData}
                            aria-busy={"true"}
                    >
                        Upload
                    </Button>
                    {pending && <CircularProgress size={25} color="primary"/>}
                    {submissionError && <Typography style={{color: 'red'}} variant="body1">
                        {getMessageFromError(submissionError)}
                    </Typography>}
                </Grid>
            </Grid>
        );

    return (
        <React.Fragment>
            <Card>
                <CardHeader title="Upload data"/>
                <CardContent>
                    {content}
                </CardContent>
            </Card>
        </React.Fragment>
    )
};

const mapMobxToProps = (store: IAppState): UploadDataFormProps => {
    const dataUpload = store.dataUpload;

    return {
        errors: dataUpload.errors,
        pending: dataUpload.pending,
        uploadData: dataUpload.uploadData,
        setFormValue: dataUpload.setField,
        setAdditionalMetaField: dataUpload.setAdditionalField,
        submissionError: dataUpload.submissionError,
        uploadDataForm: dataUpload.uploadDataForm,
        setAttachedFileName: dataUpload.setAttachedFileName,
        fileName: dataUpload.attachedFileName,
        response: dataUpload.response,
        reset: dataUpload.reset,
        serviceNodeAccount: dataUpload.serviceNodeAccount,
        dataValidatorAccount: dataUpload.dataValidatorAccount
    }
};

export const UploadDataForm = observer(inject(mapMobxToProps)(_UploadDataForm)) as React.FC<any>;
