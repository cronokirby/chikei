import { SVG } from '@svgdotjs/svg.js';
import React, { FunctionComponent } from 'react';
import { hot } from 'react-hot-loader';
import { DefaultPRNG, PRNG } from '../rng';

const SIZE = 0.01;
const NUM_CIRCLES = 50;

function drawCircles(el: HTMLElement, rng: PRNG) {
  const draw = SVG().addTo(el).size('800px', '800px');
  draw.clear();
  draw.viewbox(0, 0, 1, 1);
  for (let i = 0; i < NUM_CIRCLES; ++i) {
    const x = rng.advance();
    const y = rng.advance();
    draw.circle(SIZE).fill('#FF0000').x(x).y(y);
  }
}

const App: FunctionComponent = () => {
  const gen = React.useRef(new DefaultPRNG());
  const svgArea = React.useRef(null as HTMLDivElement | null);
  const [seed, setSeed] = React.useState('');
  React.useEffect(() => {
    setSeed(`${Math.random() * 1e17}`);
  }, []);
  React.useEffect(() => {
    const parsed = parseInt(seed, 10);
    console.log(parsed);
    if (svgArea.current && !isNaN(parsed)) {
      svgArea.current.innerHTML = '';
      gen.current.seedWith(parsed);
      drawCircles(svgArea.current, gen.current);
    }
  }, [svgArea, seed]);
  return (
    <>
      <h2>Seed</h2>
      <input
        value={seed}
        placeholder="seed"
        onChange={(e) => setSeed(e.target.value)}
      ></input>
      <div ref={svgArea}></div>
    </>
  );
};
// We need these lines for hot reloading
declare const module: any;
export default hot(module)(App);
