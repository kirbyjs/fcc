import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import './main.scss';

const Calculator = React.lazy(() => import('./calculator'))
const DrumMachine = React.lazy(() => import('./drum-machine'))
const MarkdownPreviewer = React.lazy(() => import('./markdown-previewer'))
const Pomodoro = React.lazy(() => import('./pomodoro'))
const RandomQuote = React.lazy(() => import('./random-quote'))

function App() {
    return (
        <Router>
            <>
                <nav>
                    <ul>
                        <li>
                            <Link to="/calculator">Calculator</Link>
                        </li>
                        <li>
                            <Link to="/drum-machine">Drum Machine</Link>
                        </li>
                        <li>
                            <Link to="/markdown-previewer">Markdown Previewer</Link>
                        </li>
                        <li>
                            <Link to="/pomodoro">Pomodoro</Link>
                        </li>
                        <li>
                            <Link to="/random-quote">Random Quote</Link>
                        </li>
                    </ul>
                </nav>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/" exact={true}>
                            <h1>Free Code Camp</h1>
                        </Route>
                        <Route path="/calculator">
                            <Calculator/>
                        </Route>
                        <Route path="/drum-machine">
                            <DrumMachine/>
                        </Route>
                        <Route path="/markdown-previewer">
                            <MarkdownPreviewer/>
                        </Route>
                        <Route path="/pomodoro">
                            <Pomodoro/>
                        </Route>
                        <Route path="/random-quote">
                            <RandomQuote/>
                        </Route>
                    </Switch>
                </Suspense>
            </>
        </Router>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
