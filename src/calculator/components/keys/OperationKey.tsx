import React from 'react';
import {useDispatch} from 'react-redux';
import {actions, OPERATIONS} from '../../store';
import useEffectOnKeyDown from '../../hooks/useEffectOnKeyDown';

type OperationKeyProps = {
    id: string;
    operation: OPERATIONS;
};
export default React.memo(function OperationKey(props: OperationKeyProps) {
    const dispatch = useDispatch();
    const onClick = () => dispatch(actions.addOperation(props.operation));
    useEffectOnKeyDown(props.operation, onClick);

    return (
        <div
            id={props.id}
            className='key operation-key'
            onClick={onClick}
        >
            {props.operation}
        </div>
    );
});
