import {createStore, AnyAction} from 'redux';
import {evaluate} from 'mathjs';

const ADD_DECIMAL = 'addDecimal';
const ADD_NUMBER = 'addNumber';
const ADD_OPERATION = 'addOperation';
const ALL_CLEAR = 'allClear';
const EVALUATE = 'evaluate';

export enum OPERATIONS {
    ADDITION = '+',
    DIVISION = '/',
    MULTIPLICATION = '*',
    SUBTRACTION = '-'
}

type state = {
    formula: string;
    total: number;
};
const DEFAULT_STATE: state = {
    formula: '',
    total: 0
};

export const actions = {
    addDecimal: () => ({type: ADD_DECIMAL}),
    addNumber: (number: string) => ({
        type: ADD_NUMBER,
        number
    }),
    addOperation: (operation: OPERATIONS) => ({
        type: ADD_OPERATION,
        operation
    }),
    allClear: () => ({type: ALL_CLEAR}),
    evaluate: () => ({type: EVALUATE})
};

export const selector = {
    getDisplayValue: (state: state) => state.formula || '0'
}

function addOperationToFormula(formula: string, operation: OPERATIONS) {
    if (!formula && operation !== OPERATIONS.SUBTRACTION) {
        return `0${operation}`;
    }

    return `${formula}${operation}`;
}

type reducers = {
    [key: string]: (state: state, action: AnyAction) => state
}
const reducers: reducers = {
    [ADD_DECIMAL]: (state) => {
        let {formula} = state;
        if (state.formula === `${state.total}`) {
            formula = '0.';
        } else if (!formula || Object.values(OPERATIONS).some((op) => formula.endsWith(op))) {
            formula = `${formula}0.`;
        } else if (!formula.match(/\d*\.\d*$/)) {
            formula = `${formula}.`;
        }

        return {
            ...state,
            formula: formula,
            total: 0
        };
    },
    [ADD_NUMBER]: (state, action) => {
        let {formula} = state;
        if (state.formula === `${state.total}`) {
            formula = action.number;
        } else if (state.formula !== '0' || action.number !== '0') {
            formula = `${state.formula}${action.number}`;
        }

        return {
            ...state,
            formula,
            total: 0
        };
    },
    [ADD_OPERATION]: (state, action) => {
        let formula = addOperationToFormula(state.formula, action.operation);
        const matchWithMultipleOperations = formula.match(/[*+\/\-]{2,}$/);

        if (matchWithMultipleOperations) {
            const matchWithOperationAndSubtraction = formula.match(/[*\/+]-+$/);

            if (!matchWithOperationAndSubtraction) {
                formula = `${formula.slice(0, matchWithMultipleOperations.index)}${action.operation}`
            } else if (formula.endsWith('--')) {
                formula = formula.slice(0, -1);
            }
        }

        return {
            ...state,
            formula,
            total: 0
        };
    },
    [ALL_CLEAR]: () => ({...DEFAULT_STATE}),
    [EVALUATE]: (state) => {
        const endOperationsOnFormulaWithNoEndNumberMatch = state.formula.match(/[*\/+\-]+$/);
        let {formula, total} = state;

        if (!endOperationsOnFormulaWithNoEndNumberMatch) {
            total = evaluate(formula);
            formula = `${total}`
        }

        return {
            ...state,
            formula,
            total
        };
    }
};

const store = createStore((state: state = DEFAULT_STATE, action): state => {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }

    return state;
});

export default store;
