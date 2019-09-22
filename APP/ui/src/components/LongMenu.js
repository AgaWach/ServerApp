import React, { Component } from 'react';
import  { IconButton, MenuItem, Menu } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
const ITEM_HEIGHT = 48;

class LongMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        displayMenu: false,
        chosenServerId: '',
        servers: [],
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
};

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({
        displayMenu: true,
    }, () => {
        document.addEventListener('click', this.hideDropdownMenu);
    });
}

hideDropdownMenu() {
    this.setState({displayMenu: false}, () => {
        document.removeEventListener('click', this.hideDropdownMenu);
    });
}

      render(){      
        return(
            <div>
            <IconButton>
              <MoreHorizIcon />
              </IconButton>
              <Menu
              id="long-menu"
              keepMounted
              onClose={this.hideDropdownMenu}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}>
                <MenuItem onClick={this.hideDropdownMenu}></MenuItem>
              </Menu>
 
          </div>
        )
    }
}

export default LongMenu
