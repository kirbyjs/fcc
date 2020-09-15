import React from 'react';
import DrumPad from './DrumPad';

export default function App() {
    const [displayText, setDisplayText] = React.useState('');

    return (
        <div id='drum-machine'>
            <div id='display'><span>{displayText}</span></div>
            <div id='drum-pads'>
                <DrumPad audioFile='snare' id='Q' onHit={setDisplayText}/>
                <DrumPad audioFile='kick' id='W' onHit={setDisplayText}/>
                <DrumPad audioFile='open-hh' id='E' onHit={setDisplayText}/>
                <DrumPad audioFile='closed-hh' id='A' onHit={setDisplayText}/>
                <DrumPad audioFile='clap' id='S' onHit={setDisplayText}/>
                <DrumPad audioFile='side-stick' id='D' onHit={setDisplayText}/>
                <DrumPad audioFile='punchy-kick' id='Z' onHit={setDisplayText}/>
                <DrumPad audioFile='heater-1' id='X' onHit={setDisplayText}/>
                <DrumPad audioFile='heater-2' id='C' onHit={setDisplayText}/>
            </div>
        </div>
    );
}
