import React from 'react';
import {render} from 'react-dom';
import _Styles from "./_Styles.scss";
class App extends React.Component {
  render () {
    return <h1> Welcome to you React <%= name %> App.</h1>;
  }
}

render(<App/>, document.getElementById('app'));