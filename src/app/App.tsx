import React, {useEffect} from 'react';
import "./App.css";
import AlertList from "../ducks/alerts/AlertList";
import {useAppDispatch} from "./configureStore";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {

    }, []);

    return (
        <div>
            <AlertList/>
        </div>
    );
}

export default App;
