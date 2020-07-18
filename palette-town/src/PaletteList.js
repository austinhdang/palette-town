import React from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import styles from './styles/PaletteListStyles';

function PaletteList(props) {
  const { history, palettes, classes, deletePalette } = props;

  const goToPalette = (id) => {
    history.push(`/palette/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>Palette Town</h1>
          <Link to='/palette/new' className={classes.link}>
            New Palette <AddIcon />
          </Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => (
            <CSSTransition key={palette.id} classNames='fade' timeout={500}>
              <MiniPalette
                {...palette}
                handleClick={() => goToPalette(palette.id)}
                handleDelete={deletePalette}
                key={palette.id}
                id={palette.id}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
