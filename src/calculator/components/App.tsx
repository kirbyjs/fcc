import React from 'react';
import {useSelector} from 'react-redux';
import {OPERATIONS, selector} from '../store';
import AllClearKey from './keys/AllClearKey';
import NumKey from './keys/NumKey';
import OperationKey from './keys/OperationKey';
import EnterKey from './keys/EnterKey';
import DecimalKey from './keys/DecimalKey';

export default function App() {
    const formula = useSelector(selector.getDisplayValue);

    return (
        <div id='calculator'>
            <div id='display'><span>{formula}</span></div>
            <div id='input-keys'>
                <AllClearKey/>
                <OperationKey id='divide' operation={OPERATIONS.DIVISION} />
                <OperationKey id='multiply' operation={OPERATIONS.MULTIPLICATION} />
                <NumKey id='seven' number='7'/>
                <NumKey id='eight' number='8'/>
                <NumKey id='nine' number='9'/>
                <OperationKey id='subtract' operation={OPERATIONS.SUBTRACTION} />
                <NumKey id='four' number='4'/>
                <NumKey id='five' number='5'/>
                <NumKey id='six' number='6'/>
                <OperationKey id='add' operation={OPERATIONS.ADDITION} />
                <NumKey id='one' number='1'/>
                <NumKey id='two' number='2'/>
                <NumKey id='three' number='3'/>
                <EnterKey />
                <NumKey id='zero' number='0'/>
                <DecimalKey />
            </div>
        </div>
    );
}
