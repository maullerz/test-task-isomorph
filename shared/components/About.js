import React, { Component } from 'react';
import { IndexLink } from 'react-router';

export default class About extends Component {
  render() {
    return (
      <div>
        <div>Something about this website lays here</div>
        <IndexLink to="/">
          <p>Home</p>
        </IndexLink>
      </div>
    );
  }
}
