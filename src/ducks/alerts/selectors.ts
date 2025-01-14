import {RootState} from "_app/configureStore";

export const selectAlerts = (state: RootState) => state.alerts.list;
