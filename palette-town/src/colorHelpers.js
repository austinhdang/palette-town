import chroma from 'chroma-js';

const levels = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 ];

/* Given a palette, generate shades/varieties of colors along with IDs,
   hex, RGB, and RGBA values. */
function generatePalette(palette) {
  let newPalette = {
    ...palette,
    colors: {},
  };
  for (let level of levels) {
    newPalette.colors[level] = [];
  }
  for (let color of palette.colors) {
    let scale = generateScale(color.color, 10);
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, '-'),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i]).css('rgba'),
      });
    }
  }
  return newPalette;
}

/* Creates a range of colors, starting from white and ending with a darkened
   version of the input color */
function generateRange(hexColor) {
  const start = '#fff';
  const end = chroma(hexColor).darken(1.4).hex();
  return [ start, hexColor, end ];
}

/* Generate n colors based on the input color */
function generateScale(hexColor, numColors) {
  return chroma.scale(generateRange(hexColor)).mode('lab').colors(numColors);
}

export { generatePalette };
