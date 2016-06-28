
require('../../sass/main.scss');

// essential for hot module replacement! ie, when re-saving jsx file, the webpage doesn't refresh, but the component does update!
if (module.hot){
  module.hot.accept();
}

import React from 'react';
import { render } from 'react-dom';
import Dropdown from './dropdown.jsx';

class App extends React.Component {
  render () {
    return (     
	    <Dropdown id="dropX"/>
    );
  }
}

render(<App/>, document.getElementById('app'));

