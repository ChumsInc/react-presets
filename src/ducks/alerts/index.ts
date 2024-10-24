import {createAction, createReducer, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {RootState} from "../../app/configureStore";
import {ErrorAlert} from "chums-components";

export interface AlertsState {
    nextId: number;
    list: ErrorAlert[];
}

export const initialAlertsState: AlertsState = {
    nextId: 0,
    list: [],
}

const alertSorter = (a: ErrorAlert, b: ErrorAlert) => a.id - b.id;

export const dismissAlert = createAction<Partial<Pick<ErrorAlert, 'id' | 'context'>>>('alerts/dismiss');
export const addAlert = createAction<ErrorAlert>('alerts/addAlert');

export const selectAlerts = (state: RootState) => state.alerts.list;

const alertsReducer = createReducer(initialAlertsState, (builder) => {
    builder
        .addCase(dismissAlert, (state, action) => {
            if (action.payload.id) {
                state.list = state.list.filter(alert => alert.id !== action.payload.id).sort(alertSorter);
            } else if (action.payload.context) {
                state.list = state.list.filter(alert => alert.context !== action.payload.context).sort(alertSorter);
            }
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
        .addMatcher(isRejected, (state, action) => {
            const context = action.type.replace('/rejected', '');
            const contextAlerts = state.list.filter(alert => alert.context === context);
            const newAlerts: ErrorAlert[] = [];
            if (contextAlerts.length) {
                contextAlerts[0].count += 1;
            } else {
                newAlerts.push({context, message: action.error.message ?? '', id: state.nextId, count: 1})
                state.nextId += 1;
            }
            state.list = [
                ...state.list.filter(alert => alert.context !== context),
                ...contextAlerts,
                ...newAlerts
            ].sort(alertSorter)
        })
        .addMatcher(isFulfilled, (state, action) => {
            const context = action.type.replace('/fulfilled', '');
            state.list = [
                ...state.list.filter(alert => alert.context !== context),
            ].sort(alertSorter)
        })
});

export default alertsReducer;
