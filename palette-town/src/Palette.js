import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteStyles';

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
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    const { level, format, isDiffFormat } = this.state;
    const colorBoxes = colors[level].map((color) => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        id={color.id}
        paletteId={id}
        moreUrl={`/palette/${id}/${color.id}`}
        isFullPalette
      />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
          isAllColors
        />
        <div className={classes.colors}>
          {colorBoxes}
          <div
            style={{ background: '#1ba619' }}
            className={clsx(
              classes.formatOverlay,
              isDiffFormat && classes.showOverlay
            )}
          />
          <div
            className={clsx(
              classes.formatMessage,
              isDiffFormat && classes.showMessage
            )}
          >
            <h1>Changing color format!</h1>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
