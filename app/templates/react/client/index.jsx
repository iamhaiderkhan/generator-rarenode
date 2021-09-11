import React from 'react';
import { render } from 'react-dom';
import styles from "./styles/main.scss";

class App extends React.Component {
    render() {
        return <h1>Welcome to you React App.</h1>;
    }
}

render(<App />, document.getElementById('app'));