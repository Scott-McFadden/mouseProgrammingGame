import React, { Component } from "react";
import { render } from "react-dom";
import { Grommet } from "grommet";

import { grommet } from "grommet/themes";

import './index.css';
import './App.css';
import ProgrammingGame1 from "./containers/ProgrammingGame1";

//import * as serviceWorker from './serviceWorker';

class App extends Component{

    render () {

        return (
        <Grommet theme={grommet}>
            <ProgrammingGame1 />
        </Grommet>
        );
    }
}


render(<App/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
