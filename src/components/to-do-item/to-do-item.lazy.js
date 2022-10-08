import React, { lazy, Suspense } from 'react';

const LazyToDoItem = lazy(() => import('./to-do-item'));

const ToDoItem = props => (
  <Suspense fallback={null}>
    <LazyToDoItem {...props} />
  </Suspense>
);

export default ToDoItem;
