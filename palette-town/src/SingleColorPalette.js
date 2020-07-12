import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = { format: 'hex', isDiffFormat: false };
    this.changeFormat = this.changeFormat.bind(this);
  }

  gatherShades(palette, colorToFilter) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilter)
      );
    }
    return shades.slice(1);
  }

  changeFormat(val) {
    this.setState({ format: val, isDiffFormat: true }, () => {
      setTimeout(() => this.setState({ isDiffFormat: false }), 1500);
    });
  }

  render() {
    const { paletteName, emoji } = this.props.palette;
    const { format, isDiffFormat } = this.state;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.id}
        name={color.name}
        background={color[format]}
        showLink={false}
      />
    ));
    return (
      <div className='Palette'>
        <Navbar changeFormat={this.changeFormat} isAllColors={false} />
        <div className='Palette-colors'>{colorBoxes}</div>
        <div
          style={{ background: '#1ba619' }}
          className={`format-overlay ${isDiffFormat && 'show'}`}
        />
        <div className={`format-msg ${isDiffFormat && 'show'}`}>
          <h1>Changing color format!</h1>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default SingleColorPalette;
