import chroma from 'chroma-js';
import sizes from './mediaQueries';

const styles = {
  DraggableColorBox: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '& svg': {
      color: 'rgba(0, 0, 0, 0.5)',
      fontSize: 'large',
      marginTop: '-3.5px',
      transition: 'all 0.3s ease-in-out',
    },
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)',
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: '20%',
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '10%',
    },
    [sizes.down('sm')]: {
      width: '100%',
      height: '5%',
    },
  },
  boxContent: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    padding: '10px',
    left: '0',
    bottom: '0',
    color: (props) =>
      chroma.contrast(props.color, 'white') < 4.5
        ? 'rgba(0, 0, 0, 0.8)'
        : 'white',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
};

export default styles;
