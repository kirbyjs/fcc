import React from 'react';
import {Provider} from 'react-redux';
import App from './components/App';
import store from './store';
import './pomodoro.scss';

export default function Pomodoro() {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
}
