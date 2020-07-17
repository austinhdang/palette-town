import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  colorPicker: {
    marginTop: '1.5rem',
  },
  colorButtons: {
    display: 'flex',
    flexDirection: 'row',
    '& Button': {
      width: '50%',
      fontSize: '1rem',
      lineHeight: '1.1rem',
      '& .MuiSvgIcon-root': {
        fontSize: '1.5rem',
      },
    },
  },
  randomColor: {
    marginRight: '0.5rem',
    padding: '6px 25px 6px 20px',
    backgroundColor: '#1ca9ef',
    '&:hover': {
      backgroundColor: '#239BD7',
    },
  },
  addColor: {
    marginLeft: '0.5rem',
    padding: '6px 12px 6px 8px',
    '& .MuiButton-startIcon': {
      marginRight: '0.375rem',
    },
  },
  disabled: {
    padding: '6px 25px 6px 20px',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.26)',
    boxShadow: 'none',
  },
  colorNameInput: {
    width: '100%',
    height: '64px',
  },
});

export default useStyles;
