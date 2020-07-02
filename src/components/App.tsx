import React, { FunctionComponent, useState } from 'react';
import { hot } from 'react-hot-loader';
import { DefaultPRNG } from '../rng';

const App: FunctionComponent = () => {
  const gen = React.useRef(new DefaultPRNG());
  const [seed, setSeed] = React.useState('');
  React.useEffect(() => {
    const parsed = parseInt(seed, 10);
    if (!isNaN(parsed)) {
      gen.current.seedWith(parsed);
    }
  }, [seed]);
  const [random, setRandom] = React.useState(0);
  const onNext = () => {
    setRandom(gen.current.advance());
  };
  return (
    <>
      <h2>Seed</h2>
      <input
        value={seed}
        placeholder="seed"
        onChange={(e) => setSeed(e.target.value)}
      ></input>
      <p>Random: {random}</p>
      <button onClick={onNext}>Next</button>
    </>
  );
};
// We need these lines for hot reloading
declare const module: any;
export default hot(module)(App);
