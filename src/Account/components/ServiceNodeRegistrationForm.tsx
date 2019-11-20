import React, {FunctionComponent} from "react";
import {createAccountRegistrationForm} from "./createAccountRegistrationForm";

export const ServiceNodeRegistrationForm: FunctionComponent<{}> = createAccountRegistrationForm({
    label: "Register service node",
    storeName: "serviceNodeRegistration"
});
