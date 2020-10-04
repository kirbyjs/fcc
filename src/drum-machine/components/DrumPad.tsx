import React, {Dispatch, SetStateAction} from 'react';
import classnames from 'classnames';

function playAudio(audio: HTMLAudioElement | null) {
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

type DrumPadProps = {
    audioFile: string;
    id: string;
    onHit: Dispatch<SetStateAction<string>>;
};
const DrumPad = React.memo((props: DrumPadProps) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const audioElement = React.useRef<HTMLAudioElement>(null);
    const onPlay = () => {
        playAudio(audioElement.current);
        props.onHit(props.audioFile);
        setIsPressed(true);
    };

    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!e.repeat && e.key.toLowerCase() === props.id.toLowerCase()) {
                onPlay();
            }
        };
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === props.id.toLowerCase()) {
                setIsPressed(false);
            }
        };

        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, []);

    return (
        <div
            className={classnames('drum-pad', {pressed: isPressed})}
            id={props.audioFile}
            onMouseDown={onPlay}
            onTouchStart={onPlay}
            onMouseUp={() => setIsPressed(false)}
            onTouchEnd={() => setIsPressed(false)}
        >
            {props.id}
            <audio
                ref={audioElement}
                id={props.id}
                className='clip'
                src={require(`../audio/${props.audioFile}.mp3`).default}
            />
        </div>
    );
});

export default DrumPad;
