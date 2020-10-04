import React from 'react';
import {useDispatch} from 'react-redux';
import {actions} from '../../store';
import useEffectOnKeyDown from '../../hooks/useEffectOnKeyDown';

type NumKeyProps = {
    id?: string;
    number: string;
};
export default React.memo(function NumKey(props: NumKeyProps) {
    const dispatch = useDispatch();
    const onClick = () => dispatch(actions.addNumber(props.number));
    useEffectOnKeyDown(props.number, onClick);

    return (
        <div
            className='key'
            id={props.id}
            onClick={onClick}
        >
            {props.number}
        </div>
    );
});
