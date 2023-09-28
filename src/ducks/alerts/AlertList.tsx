import React from 'react';
import {useSelector} from "react-redux";
import {dismissAlert, selectAlerts} from "./index";
import {useAppDispatch} from "../../app/configureStore";
import {Alert} from "chums-components";

const AlertList = () => {
    const dispatch = useAppDispatch();
    const list = useSelector(selectAlerts);

    const dismissHandler = (id: number) => {
        dispatch(dismissAlert(id));
    }
    return (
        <div>
            {list.map(alert => (
                <Alert key={alert.id} color={alert.color} canDismiss onDismiss={() => dismissHandler(alert.id)}
                       context={alert.context} count={alert.count}>
                    {alert.message}
                </Alert>
            ))}
        </div>
    )
}
export default AlertList;
