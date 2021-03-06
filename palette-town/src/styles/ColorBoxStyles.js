import chroma from 'chroma-js';
import sizes from './mediaQueries';

export default {
  ColorBox: {
    width: '20%',
    height: (props) => (props.isFullPalette ? '25%' : '50%'),
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    fontFamily: 'Roboto',
    '&:hover button': {
      opacity: '1',
      transition: 'all 0.3s ease-in',
      cursor: 'pointer',
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: (props) => (props.isFullPalette ? '20%' : '33.333%'),
    },
    [sizes.down('md')]: {
      width: '50%',
      height: (props) => (props.isFullPalette ? '10%' : '20%'),
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: (props) => (props.isFullPalette ? '5%' : '10%'),
    },
  },
  copyText: {
    color: (props) =>
      chroma.contrast(props.background, 'white') < 4.5 ? 'black' : 'white',
  },
  colorName: {
    color: (props) =>
      chroma.contrast(props.background, 'white') < 4.5 ? 'black' : 'white',
  },
  seeMore: {
    color: (props) =>
      chroma.contrast(props.background, 'white') < 4.5 ? 'black' : 'white',
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0',
    bottom: '0',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    color: (props) =>
      chroma.contrast(props.background, 'white') < 4.5
        ? 'rgba(0, 0, 0, 0.8)'
        : 'rgba(255, 255, 255, 0.8)',
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none',
    opacity: 0,
  },
  ColorBoxContent: {
    position: 'absolute',
    padding: '10px',
    left: '0',
    bottom: '0',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  copyOverlay: {
    opacity: '0',
    zIndex: '0',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s ease-in-out',
    transform: 'scale(0.1)',
  },
  showOverlay: {
    opacity: '1',
    transform: 'scale(50)',
    zIndex: '2',
    position: 'absolute',
  },
  copyMessage: {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
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
      [sizes.down('xs')]: {
        fontSize: '4rem',
      },
    },
    '& p': {
      fontSize: '1.5rem',
      fontWeight: '100',
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
