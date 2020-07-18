import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constants';
import sizes from './mediaQueries';

const drawerWidth = DRAWER_WIDTH;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [sizes.down('xs')]: {
      paddingRight: '0',
    },
  },
  hide: {
    display: 'none',
  },
  title: {
    [sizes.down('md')]: {
      fontSize: '1rem',
    },
    [sizes.down('xs')]: {
      fontSize: '1rem',
    },
  },
  navBtns: {
    marginRight: '1rem',
    '& Button': {
      margin: '0 0.5rem',
      [sizes.down('xs')]: {
        fontSize: '0.75rem',
        padding: '0.5rem',
      },
    },
    [sizes.down('xs')]: {
      marginRight: '0.5rem',
    },
  },
  saveButton: {
    backgroundColor: '#1FBE1D',
    '&:hover': {
      backgroundColor: '#29A728',
    },
  },
}));

export default useStyles;
