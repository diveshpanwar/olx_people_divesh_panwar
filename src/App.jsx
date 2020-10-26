import React from 'react';
import Router from './router/index';
import FooterComponent from './common/footer.component';
import { makeStyles } from '@material-ui/core';
require ('./App.css');

const AppStyle = makeStyles({
  bgCover: {
    background: 'url(images/pattern-bg.jpg)',
    height: '100vh'
  }
});

function App() {
  const classes = AppStyle();
  return (
    <div className={classes.bgCover + " App container-fluid"}>
      {Router}
      <FooterComponent/>
    </div>
  );
}

export default App;
