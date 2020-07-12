import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { isCopied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({ isCopied: true }, () => {
      setTimeout(() => this.setState({ isCopied: false }), 1500);
    });
  }

  render() {
    const { name, background, moreUrl, showLink } = this.props;
    const { isCopied } = this.state;
    const textColor =
      chroma.contrast(background, 'white') < 4.5 ? 'dark-text' : 'light-text';
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className='ColorBox'>
          <div
            style={{ background }}
            className={`copy-overlay ${isCopied && 'show'}`}
          />
          <div className={`copy-msg ${isCopied && 'show'}`}>
            <h1>Copied!</h1>
            <p className={textColor}>{background}</p>
          </div>
          <div className='copy-container'>
            <div className='ColorBox-content'>
              <span className={textColor}>{name}</span>
            </div>
            <button className={`copy-button ${textColor}`}>Copy</button>
          </div>
          {showLink && (
            <Link to={moreUrl} onClick={(evt) => evt.stopPropagation()}>
              <span className={`see-more ${textColor}`}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
