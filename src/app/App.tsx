import React, {useEffect} from 'react';
import "./App.css";
import AppAlertList from "@/components/AppAlertList";
import {useAppDispatch} from "./configureStore";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {

    }, []);

    return (
        <div>
            <AppAlertList />
        </div>
    );
}

export default App;
