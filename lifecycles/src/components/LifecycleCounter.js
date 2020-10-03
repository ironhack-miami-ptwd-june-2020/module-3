import React, { Component } from 'react';

export default class LifecycleCounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
    console.log('1 ---> This will fire first');
  }

  increment = () => {
    // this.setState({ count: this.state.count + 1 });
    this.setState(prevState => ({ count: prevState.count + 1 }));
  };

  componentDidMount() {
    console.log('3 ----> This will happen third --> Component was mounted');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('4 ---> This will fire fourth --> Component was updated');

    console.log(prevProps, prevState, snapshot);

    // we will get an empty object for previousProps since we are not passing any props

    // if props change, you have to do some kind of conditional to make sure that
    // it actually changed before you use this.setState() in here

    // if(this.props.name !== prevProps.name){
    //     this.something(this.props.name)
    // }

    // We have to compare the current props to the previous props.
    // This is to check if there was a change in props from what it currently is.
    // If the props did not change, there won’t be a need to make the API call.
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 5
    return 'here is some mid-calc';
  }

  componentWillUnmount() {
    console.log('6 ---> This will fire last ---> componentWillUnmount');
    // close API connections
    // clear events, example: window.removeEventListener('resize', this.resizeListener)
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <h1> Learning lifecycle methods in React </h1>
        <button onClick={this.increment}> {count} </button>
      </div>
    );
  }
}
