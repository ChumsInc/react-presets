import React from 'react';
import {useAppDispatch, useAppSelector} from "_app/configureStore";
import ContextAlert from "_components/alerts/ContextAlert";
import {StyledErrorAlert} from "_types/alerts";
import {selectAlerts} from "_ducks/alerts/selectors";
import {dismissAlert} from "_ducks/alerts/actions";


export type ContextFilterFunction = (alerts: StyledErrorAlert) => boolean;
export type ContextFilter = string | ContextFilterFunction;

export function isFilterFunction(fn: ContextFilter): fn is ContextFilterFunction {
    return typeof fn === "function";
}

export interface AlertListProps {
    contextFilter?: ContextFilter;
}

const AlertList = ({contextFilter}: AlertListProps) => {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectAlerts);

    const dismissHandler = (id: number) => {
        dispatch(dismissAlert({id}));
    }

    return (
        <div>
            {list
                .filter(errorAlert => !contextFilter
                    || (
                        isFilterFunction(contextFilter)
                            ? contextFilter(errorAlert)
                            : errorAlert.context === contextFilter
                    ))
                .map(alert => (
                    <ContextAlert key={alert.id} variant={alert.variant} dismissible
                                  onClose={() => dismissHandler(alert.id)}
                                  context={alert.context} count={alert.count}>
                        {alert.message}
                    </ContextAlert>
                ))}
        </div>
    )
}
export default AlertList;
