import React, {FunctionComponent} from "react";
import {inject, observer} from "mobx-react";
import {TypographyProps} from "@material-ui/core/Typography";
import {AccountBalance} from "./AccountBalance";
import {IAppState} from "../../store";

interface SelectedServiceNodeBalanceMobxProps {
    balance: number,
    selectedServiceNode?: string
}

type SelectedServiceNodeBalanceProps = SelectedServiceNodeBalanceMobxProps & TypographyProps;

const _SelectedServiceNodeBalance: FunctionComponent<SelectedServiceNodeBalanceProps> = ({
    balance,
    selectedServiceNode,
    ...rest
}) => {
    return selectedServiceNode
        ? <AccountBalance balance={balance} address={selectedServiceNode} {...rest}/>
        : null;
};

const mapMobxToProps = (state: IAppState): SelectedServiceNodeBalanceMobxProps => ({
    balance: state.settings.selectedServiceNodeAccount
        ? state.balances.accountsBalances[state.settings.selectedServiceNodeAccount] || 0
        : 0,
    selectedServiceNode: state.settings.selectedServiceNodeAccount
});

export const SelectedServiceNodeBalance = inject(mapMobxToProps)(observer(_SelectedServiceNodeBalance) as FunctionComponent<TypographyProps>);
