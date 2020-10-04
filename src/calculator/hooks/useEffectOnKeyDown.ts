import React from 'react';

export default function useEffectOnKeyDown(key: string, onKeyDownHandler: Function) {
    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!e.repeat && e.key.toLowerCase() === key) {
                onKeyDownHandler();
            }
        };

        window.addEventListener('keydown', onKeyDown)
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, []);
}
