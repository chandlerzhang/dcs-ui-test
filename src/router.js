import React from 'react';
import {Router, Route} from 'dva/router';
import Content from './routes/Content';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/" component={Content}/>
    </Router>
  );
}

export default RouterConfig;
