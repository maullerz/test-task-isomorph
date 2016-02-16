import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import About from './About';
import NewsArticle from './NewsArticle';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="about" component={About}/>
    <Route path="/news/:articleId" component={NewsArticle}/>
  </Route>
);
