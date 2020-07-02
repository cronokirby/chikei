import React, { FunctionComponent, useState } from 'react';
import { hot } from 'react-hot-loader';

const App: FunctionComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
};
// We need these lines for hot reloading
declare const module: any;
export default hot(module)(App);
