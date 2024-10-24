import React from 'react';
import {useSelector} from "react-redux";
import {dismissAlert, selectAlerts} from "./index";
import {useAppDispatch} from "../../app/configureStore";
import ContextAlert from "../../components/ContextAlert";
import {ErrorAlert} from "chums-components";


export type ContextFilterFunction = (alerts:ErrorAlert) => boolean;
export type ContextFilter = string|ContextFilterFunction;

export function isFilterFunction(fn:ContextFilter): fn is ContextFilterFunction {
    return typeof fn === "function";
}

export interface AlertListProps {
    contextFilter?: ContextFilter;
}
const AlertList = ({contextFilter}:AlertListProps) => {
    const dispatch = useAppDispatch();
    const list = useSelector(selectAlerts);

    const dismissHandler = (id: number) => {
        dispatch(dismissAlert({id}));
    }

    return (
        <div>
            {list
                .filter(errorAlert => !contextFilter || (isFilterFunction(contextFilter) ? contextFilter(errorAlert) : errorAlert.context === contextFilter))
                .map(alert => (
                <ContextAlert key={alert.id} color={alert.color} dismissible onClose={() => dismissHandler(alert.id)}
                              context={alert.context} count={alert.count}>
                    {alert.message}
                </ContextAlert>
            ))}
        </div>
    )
}
export default AlertList;
