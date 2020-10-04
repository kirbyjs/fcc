import React from 'react';
import {useDispatch} from 'react-redux';
import {actions} from '../../store';
import useEffectOnKeyDown from '../../hooks/useEffectOnKeyDown';

export default React.memo(function AllClearKey() {
    const dispatch = useDispatch();
    const onClick = () => dispatch(actions.allClear());
    useEffectOnKeyDown('clear', onClick);

    return (
        <div
            id='clear'
            className='key'
            onClick={onClick}
        >
            AC
        </div>
    );
});
