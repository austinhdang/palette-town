import sizes from './mediaQueries';
import { bgColor, bgFill, bgSize, bgRepeat, bgImg } from './background';

export default {
  '@global': {
    '.fade-exit': {
      opacity: '1',
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity 0.5s ease-out',
    },
  },
  root: {
    backgroundColor: bgColor,
    fill: bgFill,
    backgroundSize: bgSize,
    backgroundRepeat: bgRepeat,
    backgroundImage: bgImg,
    height: '100vh',
    fontFamily: 'Barlow',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'scroll',
  },
  container: {
    width: '70%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down('lg')]: {
      width: '75%',
    },
    [sizes.down('md')]: {
      width: '70%',
    },
    [sizes.down('sm')]: {
      width: '85%',
    },
    [sizes.down('xs')]: {
      width: '75%',
    },
  },
  nav: {
    display: 'flex',
    width: '100%',
    padding: '1rem 0',
    color: 'white',
    letterSpacing: '1.5px',
    justifyContent: 'space-between',
    alignItems: 'center',
    textTransform: 'uppercase',
    [sizes.down('xs')]: {
      fontSize: '1.25rem',
      flexDirection: 'column',
      paddingTop: '0.5rem',
    },
  },
  heading: {
    [sizes.down('xs')]: {
      margin: '0.75rem',
    },
  },
  link: {
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '600',
    letterSpacing: '1px',
    textDecoration: 'none',
    textTransform: 'none',
    '& .MuiSvgIcon-root': {
      marginBottom: '-5px',
    },
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '6.5% 5%',
    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 47.5%)',
      gridRowGap: '2.5%',
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
      gridRowGap: '1.25%',
    },
  },
};
