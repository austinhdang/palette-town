import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorBoxStyles';

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
    const { name, background, moreUrl, isFullPalette, classes } = this.props;
    const { isCopied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.ColorBox}>
          <div
            style={{ background }}
            className={clsx(
              classes.copyOverlay,
              isCopied && classes.showOverlay
            )}
          />
          <div
            className={clsx(
              classes.copyMessage,
              isCopied && classes.showMessage
            )}
          >
            <h1>Copied!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.ColorBoxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {isFullPalette && (
            <Link to={moreUrl} onClick={(evt) => evt.stopPropagation()}>
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
