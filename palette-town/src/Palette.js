import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './Navbar';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: 'hex', isDiffFormat: false };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeFormat(val) {
    this.setState({ format: val, isDiffFormat: true }, () => {
      setTimeout(() => this.setState({ isDiffFormat: false }), 1500);
    });
  }

  render() {
    const { colors } = this.props.palette;
    const { level, format, isDiffFormat } = this.state;
    const colorBoxes = colors[level].map((color) => (
      <ColorBox background={color[format]} name={color.name} />
    ));
    return (
      <div className='Palette'>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
        />
        <div className='Palette-colors'>
          {colorBoxes}
          <div
            style={{ background: '#1ba619' }}
            className={`format-overlay ${isDiffFormat && 'show'}`}
          />
          <div className={`format-msg ${isDiffFormat && 'show'}`}>
            <h1>Changing color format!</h1>
          </div>
        </div>
        {/* Footer goes here */}
      </div>
    );
  }
}

export default Palette;
