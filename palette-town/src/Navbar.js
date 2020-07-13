import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: 'hex', open: false };
    this.changeFormat = this.changeFormat.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  changeFormat(evt) {
    this.setState({ format: evt.target.value }, () => {
      setTimeout(() => this.setState({ open: true }), 1500);
    });
    this.props.changeFormat(evt.target.value);
  }

  closeSnackbar() {
    this.setState({ open: false });
  }

  render() {
    const { level, changeLevel, isAllColors, classes } = this.props;
    const { format, open } = this.state;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to='/'>palettetown</Link>
        </div>
        {isAllColors && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
                trackStyle={{ backgroundColor: 'transparent' }}
                railStyle={{ height: 8 }}
                handleStyle={{
                  borderColor: '#1ba619',
                  height: 13,
                  width: 13,
                  marginLeft: 0,
                  marginTop: -3,
                  backgroundColor: '#1ba619',
                  boxShadow: 'none',
                }}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.changeFormat}>
            <MenuItem value='hex'>HEX - #1243EF</MenuItem>
            <MenuItem value='rgb'>RGB - (255,255,255)</MenuItem>
            <MenuItem value='rgba'>RGBA - (12,12,12,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={open}
          autoHideDuration={3000}
          message={
            <span id='message-id'>
              Format changed to {format.toUpperCase()}!
            </span>
          }
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color='inherit'
              key='close'
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
