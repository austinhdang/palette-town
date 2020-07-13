export default {
  root: {
    backgroundColor: 'blue',
    height: '100vh',
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
  },
  nav: {
    display: 'flex',
    width: '100%',
    padding: '1rem 0',
    color: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    textTransform: 'uppercase',
    '& a': {
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: '700',
      textDecoration: 'none',
      textTransform: 'none',
    },
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
  },
};
