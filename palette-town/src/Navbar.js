import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
  render() {
    const { level, changeLevel } = this.props;
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
      </header>
    );
  }
}

export default Navbar;
