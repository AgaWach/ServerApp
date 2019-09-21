import React, { Component } from 'react';
import  { IconButton, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const ITEM_HEIGHT = 48;

class LongMenu extends Component {
      render(){      
        return(
            <div>
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          {this.props.servers.map(server => (
          <MenuItem>
            {server.status}
          </MenuItem>
          ))}           
          </div>
        )
    }
}

export default LongMenu
