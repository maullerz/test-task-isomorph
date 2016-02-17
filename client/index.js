import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router';
import App from '../shared/components/App';
import Home from '../shared/components/Home';
import About from '../shared/components/About';
import NewsArticle from '../shared/components/NewsArticle';



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
