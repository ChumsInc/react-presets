import {AsyncThunk, createAction, createReducer, isRejected, SerializedError, UnknownAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/configureStore";
import {ErrorAlert} from "chums-components";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>
export type RejectedWithErrorAction = RejectedAction & { error: SerializedError };

export interface AlertsState {
    nextId: number;
    list: ErrorAlert[];
}

export const initialAlertsState: AlertsState = {
    nextId: 0,
    list: [],
}

const alertSorter = (a:ErrorAlert, b:ErrorAlert) => a.id - b.id;

export const dismissAlert = createAction<Partial<Pick<ErrorAlert, 'id' | 'context'>>>('alerts/dismiss');
export const addAlert = createAction<ErrorAlert>('alerts/addAlert');

export const selectAlerts = (state:RootState) => state.alerts.list;

const isRejectedWithError = (action: UnknownAction): action is RejectedWithErrorAction => {
    return isRejected(action) && action.error?.message !== undefined;
}

const isFulfilledAction = (action: UnknownAction): action is FulfilledAction => {
    return typeof action.type === 'string' && action.type.endsWith('/fulfilled');
}

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
        .addMatcher(isRejectedWithError, (state, action) => {
            const context = action.type.replace('/rejected', '');
            const contextAlerts = state.list.filter(alert => alert.context === context);
            let newAlerts: ErrorAlert[] = [];
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
        .addMatcher(isFulfilledAction, (state, action) => {
            const context = action.type.replace('/fulfilled', '');
            state.list = [
                ...state.list.filter(alert => alert.context !== context),
            ].sort(alertSorter)
        })
});

export default alertsReducer;
