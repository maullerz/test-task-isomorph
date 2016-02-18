import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';

import fetchData from '../lib/fetchDataDecorator';
import * as NewsActions from '../actions/NewsActions';


@fetchData((state, dispatch, params) => dispatch(NewsActions.getArticleById(params.articleId)))
@connect(state => ({ currentArticle: state.currentArticle }), NewsActions)
export default class NewsArticle extends Component {

  render() {
    const articleData = this.props.currentArticle;

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
