import React, { lazy, Suspense } from 'react';

const LazyToDoList = lazy(() => import('./to-do-list'));

const ToDoList = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyToDoList {...props} />
  </Suspense>
);

export default ToDoList;
