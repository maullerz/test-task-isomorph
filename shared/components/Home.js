import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import fetchData from '../lib/fetchDataDecorator';
import * as NewsActions from '../actions/NewsActions';


@fetchData((state, dispatch) => dispatch(NewsActions.getNewsFeed()))
@connect(state => ({ newsFeed: state.newsFeed }), NewsActions)
export default class Home extends Component {

  newsListNode() {
    const newsFeed = this.props.newsFeed;

    console.log('newsFeed:');
    console.log(newsFeed);

    return newsFeed.map((article, index) => (
      <li key={index}>
        <Link to={'/news/'+article.id}>{article.head}</Link>
      </li>
    ), this);
  }

  render() {
    return (
      <div>
        <ul>
          {this.newsListNode()}
        </ul>
        <Link to='/about'>
          <p>About this site</p>
        </Link>
      </div>
    );
  }
}
