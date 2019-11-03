import * as React from "react";
import {Button, CircularProgress, Typography} from "@material-ui/core";
import AttachIcon from "@material-ui/icons/AttachFileRounded";
import {convertToBase64} from "../../utils";

interface Base64EncodingFileInputProps {
    onFileProcessed: (base64File: string) => void,
    onFileAttached: (fileName: string) => void,
    fileName?: string
}

export const Base64EncodingFileInput: React.FC<Base64EncodingFileInputProps> = ({onFileProcessed, onFileAttached, fileName}) => {
    const [processing, updateProcessing] = React.useState(false);
    const [processed, updateProcessed] = React.useState(false);

    const processFile = (file?: File) => {
        if (file) {
            onFileAttached(file.name);
            updateProcessing(true);
            updateProcessed(false);

            convertToBase64(file).then(result => {
                onFileProcessed(result);
                updateProcessing(false);
                updateProcessed(true);
            })
        }
    };

    const fileLabel = processed
        ? `Attached file: ${fileName}`
        : `${fileName}`;

    return (
        <React.Fragment>
            <Button variant="contained"
                    component="label"
            >
                {processing && <CircularProgress size={25} color="primary"/>}
                <AttachIcon/>
                Attach file
                <input type="file"
                       onChange={event => {
                           if (event.target.files !== null) {
                               processFile(event.target.files[0]);
                           }
                       }}
                       style={{display: "none"}}
                />
            </Button>
            {fileName && <Typography variant="body1" display="inline">{fileLabel}</Typography>}
        </React.Fragment>
    )
};
