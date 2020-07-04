import { SVG } from '@svgdotjs/svg.js';
import React, { FunctionComponent } from 'react';
import { hot } from 'react-hot-loader';
import { DefaultPRNG } from '../rng';

const App: FunctionComponent = () => {
  const gen = React.useRef(new DefaultPRNG());
  const svgArea = React.useRef(null as HTMLDivElement | null);
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
  React.useEffect(() => {
    if (svgArea.current) {
      const draw = SVG().addTo(svgArea.current).size('400px', '400px');
      draw.circle(100).fill('#FF0000');
    }
  }, [svgArea]);
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
      <div ref={svgArea}></div>
    </>
  );
};
// We need these lines for hot reloading
declare const module: any;
export default hot(module)(App);
