import React, { Component } from 'react';
import { IndexLink } from 'react-router';

import * as Datastore from '../datastore';


export default class NewsArticle extends Component {

  static promiseNeeded = [
    Datastore.getArticleById
  ]

  render() {
    const articleData = this.props.params.data;

    return (
      <div>
        <p>{`ID: ${articleData.id}`}</p>
        <p>NewsArticle:</p>
        <h1>{articleData.head}</h1>
        <div>{articleData.body}</div>
        <IndexLink to="/">Home</IndexLink>
      </div>
    );
  }

}
