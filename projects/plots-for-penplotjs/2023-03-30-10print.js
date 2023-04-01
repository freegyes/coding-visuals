const canvasSketch = require('canvas-sketch');
const { renderPaths, createPath, pathsToPolylines } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
const Random = require('canvas-sketch-util/random');

// You can force a specific seed by replacing this with a string value
const defaultSeed = '';

// Set a random seed so we can reproduce this print later
Random.setSeed(defaultSeed || Random.getRandomSeed());

// Print to console so we can see which seed is being used and copy it if desired
console.log('Random Seed:', Random.getSeed());

const settings = {
  suffix: Random.getSeed(),
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm'
};

const sketch = (props) => {
  const { width, height, units } = props;

  const margin = 1; // in working 'units' based on settings
  const box = [ margin, margin, width - margin, height - margin ];

  // Holds all our 'path' objects
  // which could be from createPath, or SVGPath string, or polylines
  const paths = [];

  const p = createPath();
  const scale = 19;
  const size = ((width - (2 * margin)) / scale);

  const countCol = scale;
  let direction;

  const countRow = Math.round(height / size) - size;

  for (let j = 1; j < countRow + 1; j++) {
    for (let i = 1; i < countCol + 1; i++) {
      
      if (Math.random() < 0.5) {
        direction = "forward";
        p.moveTo(i * size, size + j * size);
        p.lineTo(i * size + size, j * size);
      } else {
        direction = "backward";
        p.moveTo(i * size, j * size);
        p.lineTo(i * size + size, j * size + size);
      }
  }
   
  paths.push(p); 

}

  // Convert the paths into polylines so we can apply line-clipping
  // When converting, pass the 'units' to get a nice default curve resolution
  let lines = pathsToPolylines(paths, { units });

  // Clip to bounds, using a margin in working units
  lines = clipPolylinesToBox(lines, box);

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return props => renderPaths(lines, {
    ...props,
    lineJoin: 'round',
    lineCap: 'round',
    // in working units; you might have a thicker pen
    lineWidth: 0.05,
    // Optimize SVG paths for pen plotter use
    optimize: true
  });
};

canvasSketch(sketch, settings);
