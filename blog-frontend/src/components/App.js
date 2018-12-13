import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PostPage, PostListPage, EditorPage, NotFoundPage } from 'pages';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={PostListPage}/>
        <Route path="/pages/:page" component={PostListPage}/>}
        <Route path="/posts/:id" component={PostPage}/>}
        <Route path="/editor/:id?" component={EditorPage}/>}
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  );
};

export default App;