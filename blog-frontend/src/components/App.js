import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PostPage, NotFoundPage } from 'pages';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={PostPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  );
};

export default App;