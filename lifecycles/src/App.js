import React from 'react';
import './App.css';

import LifecycleCounter from './components/LifecycleCounter';

class App extends React.Component {
  state = {
    counterIsActive: false
  };

  toggleCounter = () => {
    this.setState(prevState => ({
      counterIsActive: !prevState.counterIsActive
    }));
  };

  render() {
    const { counterIsActive } = this.state;

    return (
      <div className='App'>
        <header className='App-header'>
          <button onClick={this.toggleCounter}> {counterIsActive ? 'Unmount' : 'Mount'} </button>
          {counterIsActive && <LifecycleCounter />}
        </header>
      </div>
    );
  }
}

export default App;
