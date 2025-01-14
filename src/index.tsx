import React from 'react';
import {Provider} from 'react-redux';
import App from '_app/App';
import store from '_app/configureStore'
import {createRoot} from "react-dom/client";

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
