import React from 'react';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';

type LengthAdjustmentProps = {
    id: string;
    length: number;
    incrementAction: () => AnyAction
    decrementAction: () => AnyAction
};
export default React.memo(function LengthAdjustment(props: LengthAdjustmentProps) {
    const lowerCasedId = props.id.toLowerCase();
    const dispatch = useDispatch();
    const increment = () => dispatch(props.incrementAction());
    const decrement = () => dispatch(props.decrementAction());

    return (
        <div id={lowerCasedId} className='length-adjustment'>
            <h2 id={`${lowerCasedId}-label`}>{props.id} Length</h2>
            <div className='adjustment-wrapper'>
                <i id={`${lowerCasedId}-decrement`} className="material-icons" onClick={decrement}>remove_circle_outline</i>
                <span id={`${lowerCasedId}-length`} className='text'>{props.length}</span>
                <i id={`${lowerCasedId}-increment`} className="material-icons" onClick={increment}>add_circle_outline</i>
            </div>
        </div>
    );
});
