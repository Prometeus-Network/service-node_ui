import * as React from "react";
import {Typography} from "@material-ui/core";
const StickyFooter = require('react-sticky-footer').default;
const {version} = require("../../../package.json");

export const Footer: React.FC<{}> = () => (
    <StickyFooter stickyStyles={{width: '100%'}}>
        <Typography variant="caption"
                    color="textSecondary"
        >
            Service node client v. {version}
        </Typography>
    </StickyFooter>
);
