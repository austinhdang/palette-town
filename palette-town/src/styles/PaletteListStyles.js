import sizes from './mediaQueries';

export default {
  root: {
    backgroundColor: 'blue',
    height: '100vh',
    fontFamily: 'Barlow',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
      fontSize: '0.9rem',
    },
    '& a': {
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
