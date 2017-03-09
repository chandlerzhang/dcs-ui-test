import React from 'react';
import {Router, Route} from 'dva/router';
import Content from './routes/Content';
import Main from './static/Main'

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/" component={Content}/>
      <Route path="/main" component={Main}/>
    </Router>
  );
}

export default RouterConfig;
