import React, { Component } from 'react';
import { AppBar, Toolbar, Typography}  from '@material-ui/core';
import Icons from './Icons';


class SimpleAppBar extends Component {
  render() {
    return (
      <div >
        <AppBar position="static" color ='secondary'>
          <Toolbar>
            <Typography variant="body2" align="center">
              <Icons />
              Recruitment task
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );  
  }
}

export default SimpleAppBar