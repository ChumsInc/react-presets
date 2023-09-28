import {createAction, createReducer, isRejected} from "@reduxjs/toolkit";
import {RootState} from "../../app/configureStore";
import {RejectedAction} from "@reduxjs/toolkit/dist/query/core/buildThunks";
import {BasicAlert} from "chums-components";

export interface ErrorAlert extends BasicAlert {
    id: number;
    count: number;
}

export interface AlertsState {
    nextId: number;
    list: ErrorAlert[];
}

export const initialAlertsState: AlertsState = {
    nextId: 0,
    list: [],
}

const alertSorter = (a:ErrorAlert, b:ErrorAlert) => a.id - b.id;

export const dismissAlert = createAction<number>('alerts/dismiss');
export const addAlert = createAction<ErrorAlert>('alerts/addAlert');

export const selectAlerts = (state:RootState) => state.alerts.list;

function isErrorAction(action: RejectedAction<any, any>): action is RejectedAction<any, any> {
    return action?.meta?.requestStatus === 'rejected';
}


const alertsReducer = createReducer(initialAlertsState, (builder) => {
    builder
        .addCase(dismissAlert, (state, action) => {
            state.list = [
                ...state.list.filter(alert => alert.id !== action.payload)
            ].sort(alertSorter);
        })
        .addCase(addAlert, (state, action) => {
            const [contextAlert] = state.list.filter(alert => action.payload.context !== '' && alert.context === action.payload.context)
            if (contextAlert) {
                contextAlert.count += 1;
                state.list = [
                    ...state.list.filter(alert => action.payload.context !== '' && alert.context === action.payload.context),
                    contextAlert
                ].sort(alertSorter);
            } else {
                state.list = [
                    ...state.list,
                    {...action.payload, id: state.nextId}
                ].sort(alertSorter);
                state.nextId += 1;
            }
        })
        .addMatcher(isErrorAction, (state, action) => {
            const context = action.type.replace('/rejected', '');
            let [contextAlert] = state.list.filter(alert => alert.context === context);
            if (!contextAlert) {
                contextAlert = {id: state.nextId, count: 1, message: action.error.message ?? '', context, color: 'danger'}
                state.nextId += 1;
            } else {
                contextAlert.count += 1;
            }
            state.list = [
                ...state.list.filter(alert => alert.context !== context),
                contextAlert,
            ].sort(alertSorter);
        })
        .addDefaultCase((state, action) => {
            if (isRejected(action) && action.error) {
                state.list = [
                    ...state.list,
                    {
                        context: action.type.replace('/rejected', ''),
                        message: action.error.message ?? '',
                        id: state.nextId,
                        count: 1
                    }
                ].sort(alertSorter)
                state.nextId += 1;
            }
        })
});

export default alertsReducer;
