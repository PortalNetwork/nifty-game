import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Title} from './Title';

export const Top = (props) => (
  <div className="Top">
    <AppBar position="static" className="AppBar">
      <Toolbar>
        <Title/>
      </Toolbar>
    </AppBar>
  </div>
);