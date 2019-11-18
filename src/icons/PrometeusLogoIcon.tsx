import React, {FunctionComponent} from "react";
import PrometeusLogo from "../logo.svg";

export const PrometeusLogoIcon: FunctionComponent<{}> = () => (
    <img src={PrometeusLogo} style={{
        width: "1.2em",
        height: "1.2em"
    }}/>
);
