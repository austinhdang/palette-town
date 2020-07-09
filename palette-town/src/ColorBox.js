import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { isCopied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  /* Changes isCopied to true and flips back to false after 1500ms */
  changeCopyState() {
    this.setState({ isCopied: true }, () => {
      setTimeout(() => this.setState({ isCopied: false }), 1500);
    });
  }

  render() {
    const { name, background } = this.props;
    const { isCopied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className='ColorBox'>
          <div
            style={{ background }}
            className={`copy-overlay ${isCopied && 'show'}`}
          />
          <div className={`copy-msg ${isCopied && 'show'}`}>
            <h1>Copied!</h1>
            <p>{background}</p>
          </div>
          <div className='copy-container'>
            <div className='ColorBox-content'>
              <span>{name}</span>
            </div>
            <button className='copy-button'>Copy</button>
          </div>
          <span className='see-more'>More</span>
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
