import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import './Palette.css';

const styles = {
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  colors: {
    height: '90%',
  },
  formatOverlay: {
    display: 'none',
    opacity: '0',
    zIndex: '0',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s ease-in-out',
    transform: 'scale(0.1)',
  },
  showOverlay: {
    display: 'flex',
    opacity: '1',
    transform: 'scale(50)',
    zIndex: '2',
    position: 'absolute',
  },
  formatMessage: {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    transform: 'scale(0.1)',
    opacity: '0',
    color: 'white',
    '& h1': {
      fontWeight: '400',
      textShadow: '1px 2px black',
      background: 'rgba(255, 255, 255, 0.2)',
      width: '100%',
      textAlign: 'center',
      marginBottom: '0',
      padding: '1rem',
      textTransform: 'uppercase',
    },
  },
  showMessage: {
    opacity: '1',
    transform: 'scale(1)',
    zIndex: '3',
    transition: 'all 0.4s ease-in-out',
    transitionDelay: '0.1s',
  },
};

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
            className={`${classes.formatOverlay} ${isDiffFormat &&
              classes.showOverlay}`}
          />
          <div
            className={`${classes.formatMessage} ${isDiffFormat &&
              classes.showMessage}`}
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
