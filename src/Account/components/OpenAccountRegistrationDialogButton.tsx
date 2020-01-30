import React, {FunctionComponent} from "react";
import {inject, observer} from "mobx-react";
import {Button} from "@material-ui/core";
import {IAppState} from "../../store";

interface OpenAccountRegistrationDialogButtonMobxProps {
    setAccountRegistrationDialogOpen: (accountRegistrationDialogOpen: boolean) => void
}

const _OpenAccountRegistrationDialogButton: FunctionComponent<OpenAccountRegistrationDialogButtonMobxProps> = ({
    setAccountRegistrationDialogOpen
}) => (
    <Button variant="text"
            color="primary"
            onClick={() => setAccountRegistrationDialogOpen(true)}
    >
        Add new wallet
    </Button>
);

const mapMobxToProps = (state: IAppState): OpenAccountRegistrationDialogButtonMobxProps => ({
    setAccountRegistrationDialogOpen: state.registration.setRegistrationDialogOpen
});

export const OpenAccountRegistrationDialogButton = inject(mapMobxToProps)(observer(_OpenAccountRegistrationDialogButton as FunctionComponent));
