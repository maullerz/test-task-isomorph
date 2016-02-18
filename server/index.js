import express                  from 'express';
import React                    from 'react';
import { renderToString }       from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation           from 'history/lib/createLocation';
import path                     from 'path';
import { Provider }             from 'react-redux';
import { createStore,
         applyMiddleware }      from 'redux';

import promiseMiddleware        from '../shared/lib/promiseMiddleware';
import fetchComponentData       from '../shared/lib/fetchComponentData';
import reducer                  from '../shared/reducers/NewsReducer';
import routes                   from '../shared/routes';
import getNewsHeaders           from '../shared/datastore';



const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.use(function(req, res, next) {
  if (req.path !== '/sockjs-node/info')
    console.log('requested path: %s', req.path);

  next();
});


app.use( (req, res) => {
  const location = createLocation(req.url);
  const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps)
      return res.status(404).end('Not found');

    // фетчим данные необходимые для компонента по требуемому роуту
    fetchComponentData(store, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => {
        console.log(err);
        res.end(err.message)
      });


    function renderView() {
      const componentHTML = renderToString(
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );

      const initialState = store.getState();

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>News Feed Demo</title>
          <script>
            window.INITIAL_STATE = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }
  });
});

export default app;
