import React from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import AlertList, {dismissAlert, selectAllAlerts, StyledErrorAlert} from "@chumsinc/alert-list";

export default function AppAlertList() {
    const dispatch = useAppDispatch();
    const alertList = useAppSelector(selectAllAlerts);
    const dismissHandler = (alert:StyledErrorAlert) => {
        dispatch(dismissAlert(alert));
    }
    return (
        <AlertList list={alertList} onDismiss={dispatch} />
    )
}
