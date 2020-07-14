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
    letterSpacing: '1.5px',
    justifyContent: 'space-between',
    alignItems: 'center',
    textTransform: 'uppercase',
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
  },
};
