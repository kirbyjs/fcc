import React from 'react';
import {useSelector} from 'react-redux';
import {actions, CLOCK_TYPES, selector} from '../store';
import LengthAdjustment from './LengthAdjustment';
import Timer from './Timer';

export default function App() {
    const sessionLength = useSelector(selector.getSessionLength);
    const breakLength = useSelector(selector.getBreakLength);

    return (
        <div id='pomodoro-timer'>
            <h1>Pomodoro Timer</h1>
            <div id='length-adjustments'>
                <LengthAdjustment
                    id={CLOCK_TYPES.BREAK}
                    decrementAction={actions.decrementBreakLength}
                    incrementAction={actions.incrementBreakLength}
                    length={breakLength}
                />
                <LengthAdjustment
                    id={CLOCK_TYPES.SESSION}
                    decrementAction={actions.decrementSessionLength}
                    incrementAction={actions.incrementSessionLength}
                    length={sessionLength}
                />
            </div>
            <Timer/>
        </div>
    );
}
