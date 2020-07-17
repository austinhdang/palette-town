import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constants';

const drawerWidth = DRAWER_WIDTH;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerContainer: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paletteButtons: {
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
  randomPalette: {
    marginRight: '0.5rem',
    padding: '6px 25px 6px 20px',
    backgroundColor: '#1ca9ef',
    '&:hover': {
      backgroundColor: '#239BD7',
    },
  },
  clearPalette: {
    marginLeft: '0.5rem',
    padding: '6px 22px 6px 20px',
    backgroundColor: '#EB030B',
    '&:hover': {
      backgroundColor: '#D0080F',
    },
  },
}));

export default useStyles;
