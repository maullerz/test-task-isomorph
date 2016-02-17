import React, { Component } from 'react';
import { Link } from 'react-router';

import * as Datastore from '../datastore';


export default class Home extends Component {

  static promiseNeeded = [
    Datastore.getNewsList
  ]

  render() {
    const newsFeed = this.props.params.data;

    return (
      <div>
        <ul>
          {newsFeed.map(article => (
            <li key={article.id}>
              <Link
                to={{
                  pathname: `/news/${article.id}`,
                  state: { returnTo: this.props.location.pathname }
                }}
              >
                {article.head}
              </Link>
            </li>
          ), this)}
        </ul>
        <Link to={'about'}>
          <p>About this site</p>
        </Link>
      </div>
    );
  }
}
