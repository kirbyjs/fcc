import React from 'react';
import {useDispatch} from 'react-redux';
import {actions} from '../../store';
import useEffectOnKeyDown from '../../hooks/useEffectOnKeyDown';

export default React.memo(function DecimalKey() {
    const dispatch = useDispatch();
    const onClick = () => dispatch(actions.addDecimal());
    useEffectOnKeyDown('.', onClick);

    return (
        <div
            id='decimal'
            className='key'
            onClick={onClick}
        >
            .
        </div>
    );
});
