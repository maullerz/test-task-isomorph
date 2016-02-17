import express                  from 'express';
import React                    from 'react';
import { renderToString }       from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import createLocation           from 'history/lib/createLocation';
import path                     from 'path';

import routes                   from '../shared/routes';
import getNewsHeaders           from '../shared/datastore';

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) {
  if (req.path !== '/sockjs-node/info') {
    console.log('requested path: %s', req.path);
  }
  next();
});


function fetchNeededData(components, params) {
  const needs = components.reduce(function(prev, current) {
    return (current.promiseNeeded || []).concat(prev);
  }, []);

  const promises = needs.map(function(need) {return need(params)});

  return Promise.all(promises);
}


app.use( (req, res) => {
  const location = createLocation(req.url);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps)
      return res.status(404).end('Not found');

    // фетчим данные необходимые для компонента по требуемому роуту
    fetchNeededData(renderProps.components, renderProps.params)
      .then(data => renderView(data))
      .then(html => res.end(html))
      .catch(err => {
        console.log(err);
        res.end(err.message)
      });


    function renderView(data) {
      if (data)
        renderProps.params.data = data[0]; // FIXME flatten array

      const componentHTML = renderToString(<RouterContext {...renderProps} />);
      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Test Demo</title>
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
