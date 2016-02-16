import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router';
import App from './App';
import Home from './Home';
import About from './About';
import NewsArticle from './NewsArticle';



ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="/news/:articleId" component={NewsArticle}/>
      </Route>
    </Router>
  ), document.getElementById('react-view')
);
