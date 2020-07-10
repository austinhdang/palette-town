import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: 'hex', open: false };
    this.changeFormat = this.changeFormat.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  changeFormat(evt) {
    this.setState({ format: evt.target.value, open: true });
    this.props.changeFormat(evt.target.value);
  }

  closeSnackbar() {
    this.setState({ open: false });
  }

  render() {
    const { level, changeLevel } = this.props;
    const { format, open } = this.state;
    return (
      <header className='Navbar'>
        <div className='Navbar-logo'>
          <a href='#'>palettetown</a>
        </div>
        <div className='slider-container'>
          <span>Level: {level}</span>
          <div className='slider'>
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
                marginLeft: -7,
                marginTop: -3,
                backgroundColor: '#1ba619',
                boxShadow: 'none',
              }}
            />
          </div>
        </div>
        <div className='select-container'>
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

export default Navbar;
