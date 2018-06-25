import React, { Component } from 'react';

import Root from './src/main';
export default class App extends Component {
  render() {
      return (
      <Root {...this.props} />
      );
  }
}
