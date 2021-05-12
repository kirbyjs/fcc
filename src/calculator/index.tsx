import React from 'react';
import {Provider} from 'react-redux';
import store  from './store';
import App from './components/App';
import './calculator.scss';

export default function Calculator() {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
}
