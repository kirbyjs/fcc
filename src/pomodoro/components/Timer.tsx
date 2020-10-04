import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions, selector, STEP_INTERVAL} from '../store';

export default React.memo(function Timer() {
    const audioElement = React.useRef<HTMLAudioElement>(null);
    const dispatch = useDispatch();
    const isRunning = useSelector(selector.isRunning);
    const timerValue = useSelector(selector.timerValue);
    const clockType = useSelector(selector.getClockType);
    const nextTriggerTime = useSelector(selector.getNextTriggerTime);
    const play = () => dispatch(actions.play(Date.now()));
    const pause = () => dispatch(actions.pause());

    React.useEffect(() => {
        let timeout: number;

        if (isRunning) {
            if (timerValue === '00:00') {
                audioElement.current?.play();
            }
            const drift = Date.now() - nextTriggerTime;

            timeout = window.setTimeout(() => {
                dispatch(actions.step(nextTriggerTime + STEP_INTERVAL))
            }, Math.max(0, STEP_INTERVAL - drift));
        }

        return () => window.clearTimeout(timeout);
    }, [timerValue, isRunning]);

    return (
      <div id='timer'>
          <h3 id='timer-label'>{clockType}</h3>
          <div id='time-left'>{timerValue}</div>
          <div id='controls'>
              <button
                  id="reset"
                  onClick={() => {
                      dispatch(actions.reset());
                      if (audioElement.current) {
                          audioElement.current.pause();
                          audioElement.current.currentTime = 0;
                      }
                  }}
              >
                  Reset
                  <i className='material-icons'>refresh</i>
              </button>
              <button id="start_stop" onClick={isRunning ? pause : play}>
                  {isRunning ? 'Pause' : 'Play'}
                  <i className='material-icons'>
                      {isRunning ? 'pause_circle_outline' : 'play_circle_outline'}
                  </i>
              </button>
          </div>
          <audio
              ref={audioElement}
              id='beep'
              src={require(`../audio/school-bell.mp3`).default}
          />
      </div>
    );
});
