import {createStore, AnyAction} from 'redux';

export const STEP_INTERVAL = 1000;
const ONE_MINUTE_IN_MILLIS = 60 * 1000;
const DEFAULT_BREAK_LENGTH = 5;
const DEFAULT_SESSION_LENGTH = 25;

const DECREMENT_BREAK = 'decrementBreak';
const DECREMENT_SESSION = 'decrementSession';
const INCREMENT_BREAK = 'incrementBreak';
const INCREMENT_SESSION = 'incrementSession';
const PAUSE = 'pause';
const PLAY = 'play';
const RESET = 'reset';
const STEP = 'step';

export enum CLOCK_TYPES {
    BREAK = 'Break',
    SESSION = 'Session'
}

type State = {
    breakLength: number;
    clockType: CLOCK_TYPES;
    isRunning: boolean;
    millisecondsLeft: number;
    nextTriggerTime: number;
    sessionLength: number;
};
const DEFAULT_STATE: State = {
    breakLength: DEFAULT_BREAK_LENGTH,
    clockType: CLOCK_TYPES.SESSION,
    isRunning: false,
    millisecondsLeft: DEFAULT_SESSION_LENGTH * ONE_MINUTE_IN_MILLIS,
    nextTriggerTime: 0,
    sessionLength: DEFAULT_SESSION_LENGTH
};

export const actions = {
    decrementBreakLength: () => ({type: DECREMENT_BREAK}),
    decrementSessionLength: () => ({type: DECREMENT_SESSION}),
    incrementBreakLength: () => ({type: INCREMENT_BREAK}),
    incrementSessionLength: () => ({type: INCREMENT_SESSION}),
    pause: () => ({type: PAUSE}),
    play: (nextTriggerTime: number) => ({type: PLAY, nextTriggerTime}),
    reset: () => ({type: RESET}),
    step: (nextTriggerTime: number) => ({type: STEP, nextTriggerTime})
};

export const selector = {
    isRunning: ({isRunning}: State) => isRunning,
    getClockType: ({clockType}: State) => clockType,
    getBreakLength: ({breakLength}: State) => breakLength,
    getNextTriggerTime: ({nextTriggerTime}: State) => nextTriggerTime,
    getSessionLength: ({sessionLength}: State) => sessionLength,
    timerValue: ({millisecondsLeft}: State) => {
        const minutes = Math.floor(millisecondsLeft / ONE_MINUTE_IN_MILLIS).toString().padStart(2, '0');
        const seconds = Math.floor(millisecondsLeft % ONE_MINUTE_IN_MILLIS / 1000).toString().padStart(2, '0');

        return `${minutes}:${seconds}`;
    }
}

function incrementLength(length: number, isRunning: boolean) {
    if (isRunning || length === 60) {
        return length;
    }

    return length + 1;
}

function decrementLength(length: number, isRunning: boolean) {
    if (isRunning || length === 1) {
        return length;
    }

    return length - 1;
}

function calculateMillisecondsLeft(state: State, length: number, changedClockType: CLOCK_TYPES) {
    if (state.clockType !== changedClockType) {
        return state.millisecondsLeft;
    }

    return length * ONE_MINUTE_IN_MILLIS;
}

type reducers = {
    [key: string]: (state: State, action: AnyAction) => State
}
const reducers: reducers = {
    [DECREMENT_BREAK]: (state) => {
        const breakLength = decrementLength(state.breakLength, state.isRunning);
        const millisecondsLeft = calculateMillisecondsLeft(state, breakLength, CLOCK_TYPES.BREAK);

        return {
            ...state,
            breakLength,
            millisecondsLeft
        };
    },
    [DECREMENT_SESSION]: (state) => {
        const sessionLength = decrementLength(state.sessionLength, state.isRunning);
        const millisecondsLeft = calculateMillisecondsLeft(state, sessionLength, CLOCK_TYPES.SESSION);

        return {
            ...state,
            sessionLength,
            millisecondsLeft
        };
    },
    [INCREMENT_BREAK]: (state) => {
        const breakLength = incrementLength(state.breakLength, state.isRunning);
        const millisecondsLeft = calculateMillisecondsLeft(state, breakLength, CLOCK_TYPES.BREAK);

        return {
            ...state,
            breakLength,
            millisecondsLeft
        };
    },
    [INCREMENT_SESSION]: (state) => {
        const sessionLength = incrementLength(state.sessionLength, state.isRunning);
        const millisecondsLeft = calculateMillisecondsLeft(state, sessionLength, CLOCK_TYPES.SESSION);

        return {
            ...state,
            sessionLength,
            millisecondsLeft
        };
    },
    [PAUSE]: (state) => ({
        ...state,
        isRunning: false,
        nextTriggerTime: 0
    }),
    [PLAY]: (state, {nextTriggerTime}) => ({
        ...state,
        nextTriggerTime,
        isRunning: true
    }),
    [RESET]: () => ({...DEFAULT_STATE}),
    [STEP]: (state: State, {nextTriggerTime}) => {
        let {clockType} = state;
        let millisecondsLeft = state.millisecondsLeft - STEP_INTERVAL;

        if (state.millisecondsLeft === 0) {
            clockType = clockType === CLOCK_TYPES.SESSION ? CLOCK_TYPES.BREAK : CLOCK_TYPES.SESSION;
            millisecondsLeft = clockType === CLOCK_TYPES.SESSION ? state.sessionLength * ONE_MINUTE_IN_MILLIS : state.breakLength * ONE_MINUTE_IN_MILLIS;
        }

        return {
            ...state,
            clockType,
            millisecondsLeft,
            nextTriggerTime
        };
    }
};

const store = createStore((state: State = DEFAULT_STATE, action): State => {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }

    return state;
});

export default store;
