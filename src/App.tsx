import { useLayoutEffect, useState, useRef, useEffect } from "react";
import "./App.css";
import Stats from "stats.js";
import { Page } from "./Page";

const MIN_X_PADDING = 45;
const MIN_Y_PADDING = 45;
const DESIGN_SIZE = { width: 1080, height: 1080 };
const PAGES_COUNT = 20;

function App() {
  const [scale, setScale] = useState(1);
  const [size, setSize] = useState({ width: 100, height: 100 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    requestAnimationFrame(function loop() {
      stats.update();
      requestAnimationFrame(loop);
    });
  }, []);

  const centerArtboard = () => {
    if (containerRef.current === null) {
      return;
    }

    const box = containerRef.current.getBoundingClientRect();

    setSize((size) => ({
      ...size,
      width: box.width,
    }));
  };

  const checkSize = () => {
    if (containerRef.current === null) {
      return;
    }
    const box = containerRef.current.getBoundingClientRect();

    if (box.width === 0 || box.height === 0) {
      console.warn("Bad size");
    }

    setSize({
      width: box.width,
      height: box.height,
    });

    const scaleX = (box.width - MIN_X_PADDING * 2) / DESIGN_SIZE.width;
    const scaleY = (box.height - MIN_Y_PADDING * 2) / DESIGN_SIZE.height;
    const scale = Math.max(Math.min(scaleX, scaleY), 0.01);
    setScale(scale);
  };

  useLayoutEffect(checkSize, []);
  useLayoutEffect(centerArtboard, []);

  const xPadding = Math.max(
    MIN_X_PADDING,
    (size.width - DESIGN_SIZE.width * scale) / 2
  );
  const yPadding = MIN_Y_PADDING * scale;

  const pageWidth = DESIGN_SIZE.width * scale + xPadding * 2;
  const pageHeight = DESIGN_SIZE.height * scale + yPadding * 2;

  return (
    <div>
      <div ref={containerRef}>
        {Array(PAGES_COUNT)
          .fill(0)
          .map((__x, i) => (
            <Page
              scale={scale}
              key={`page-${i}`}
              pageDims={{ width: pageWidth, height: pageHeight }}
              designDims={DESIGN_SIZE}
              padding={{ x: xPadding, y: yPadding }}
            />
          ))}
        {/* </div> */}
      </div>

      <div className="zoom-control">
        <button
          onClick={() => setScale((curr) => Math.max(0.1, (curr -= 0.1)))}
        >
          Zoom Out
        </button>
        <span>{(scale * 100).toFixed(2)}%</span>
        <button onClick={() => setScale((curr) => (curr += 0.1))}>
          Zoom In
        </button>
      </div>
    </div>
  );
}

export default App;
