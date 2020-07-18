import sizes from './mediaQueries';

export default {
  Navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '6vh',
    fontFamily: 'Roboto',
    fontWeight: '500',
    '& span': {
      [sizes.down('xs')]: {
        paddingLeft: '50px',
      },
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '15px',
    padding: '0 13px',
    height: '100%',
    fontSize: '22px',
    fontWeight: '400',
    backgroundColor: '#eceff1',
    '& a': {
      textDecoration: 'none',
      color: 'black',
    },
    [sizes.down('xs')]: {
      width: '100%',
      marginRight: 0,
      justifyContent: 'center',
    },
  },
  slider: {
    width: '340px',
    margin: '0 10px',
    display: 'inline-block',
    [sizes.down('md')]: {
      width: '150px',
    },
  },
  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem',
  },
};
