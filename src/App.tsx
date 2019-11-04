import * as React from "react";
import {MuiThemeProvider} from "@material-ui/core";
import {SnackbarProvider} from "notistack";
import enLocale from "date-fns/locale/en-GB";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {cyan} from "./themes";

const {MobxRouter} = require("mobx-router");

export const App: React.FC = () => (
    <div id="app">
        <SnackbarProvider maxSnack={3}>
            <MuiThemeProvider theme={cyan}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}
                                         locale={enLocale}
                >
                    <MobxRouter/>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        </SnackbarProvider>
    </div>
);
