import React from 'react';
import {useDispatch} from 'react-redux';
import {actions} from '../../store';
import useEffectOnKeyDown from '../../hooks/useEffectOnKeyDown';

export default React.memo(function EnterKey() {
    const dispatch = useDispatch();
    const onClick = () => dispatch(actions.evaluate());
    useEffectOnKeyDown('enter', onClick);

    return (
        <div
            id='equals'
            className='key'
            onClick={onClick}
        >
            =
        </div>
    );
});
