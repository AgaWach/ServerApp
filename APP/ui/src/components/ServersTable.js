import React, {Component} from 'react';
import axios from "axios";
import {Paper, Button, TableCell, TableRow, TableBody, TableHead, Table, IconButton, FormControlLabel, Switch, CircularProgress } from "@material-ui/core";
import Chart from './Chart';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

class ServersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenServerId: '',
            servers: [],
            showMenu: [],
        };
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    };

    showMenu(serverid) {
        let state = this.state;
        state.showMenu[serverid] = state.showMenu[serverid] === false || !state.showMenu[serverid];
        this.setState(state);
    }

    closeMenu(event) {
        if (!this.dropdownMenu.contains(event.target)) {
        this.setState({ showMenu: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });
      }
    }

    async turn(serverId, action) {
        this.setState({
            servers: this.props.servers,
        });
        const result = await axios.put(`http://localhost:4454/servers/${serverId}/${action}`);
        //console.log(result.data.status);
        if (result.status === 200) {
            const serverIndex = this.props.servers.findIndex(x => x.id === result.data.id);
            
            if (serverIndex > -1) {
                if (result.data.status === 'REBOOTING') {
                    let server = {};
                    server = this.rebooting(serverId, server);
                    console.log(server.status);
                }
                this.props.servers[serverIndex].status = result.data.status;
                this.setState({
                    servers: this.props.servers,
                });
            }
        } else if (result.status === 400) {
            console.log("Error")
        }
    }

    async rebooting(serverId, server) {
        if (!server) {
            setInterval(async () => {
                server = await axios.get(`http://localhost:4454/servers/${serverId}/`);
                console.log(server);
                if (server.data.status === 'REBOOTING') {
                    await this.rebooting(serverId, server)
                } else if (server.data.status === 'ONLINE') {
                    return server;
                }
            }, 1000);
        }
        var intervalRebootin = setInterval(async () => {
            server = await axios.get(`http://localhost:4454/servers/${serverId}/`);
            if (server.data.status === 'REBOOTING') {
                await this.rebooting(serverId, server)
            } else {
                clearInterval(intervalRebootin);

                for (let index = 0; index < this.state.servers.length; index++) {
                    let singleserver = this.state.servers[index];
                    if(singleserver.id === server.data.id){
                        let state = this.state;
                        state.servers[index] = server.data;
                        this.setState(state);
                        return server;
                    }
                }

                return server;
            }
        }, 1000);
    }

    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>NAME</TableCell>
                            <TableCell align="left">STATUS</TableCell>
                            <TableCell align="right">SETTINGS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.servers.map(server => (
                            <TableRow key={server.name}>
                                <TableCell component="th" scope="row">
                                    {server.name}
                                </TableCell>
                                <TableCell align="left">
                                {server.status === 'ONLINE' ? 
                                (<div className='Server_online'><CheckCircleIcon />{server.status}</div>)
                                    : 
                                (<div className='Server_offline'><ErrorIcon />{server.status}</div>)}
                                </TableCell>
                                <TableCell align="right">
                                <IconButton onClick={() => this.showMenu(server.id)} aria-label="more" aria-controls="long-menu" aria-haspopup="true" >
                                 <MoreHorizIcon />  
                                </IconButton>
                                {this.state.showMenu[server.id] && this.state.showMenu[server.id] === true ? (
                                    <div className="Menu" ref={(element) => {
                                        this.dropdownMenu = element; }}>
                                        {server.status === 'REBOOTING' ? (
                                            <div className="Menu_Rebooting"><p>REBOOTING</p><CircularProgress />
                                            </div>
                                        ) : (null) }
                                        {server.status === 'ONLINE' ? (
                                                <div>
                                                    <div className="Menu_On">
                                                        <Button onClick={() => this.turn(server.id, 'off')}>
                                                        <FormControlLabel
                                                            control={<Switch color="primary" />}
                                                            label="Turn Off Server"
                                                            labelPlacement="end"
                                                            />
                                                        </Button>
                                                        <Button onClick={() => this.turn(server.id, 'reboot')}>Reboot</Button>
                                                        <Chart />  
                                                    </div>
                                                </div>
                                            ) : null }
                                        {server.status === 'OFFLINE' ? (
                                                <div>
                                                <div className="Menu_Off">
                                                    <Button onClick={() => this.turn(server.id, 'on')}>
                                                    <FormControlLabel
                                                            control={<Switch color="primary" />}
                                                            label="Turn On Server"
                                                            labelPlacement="end"
                                                            checked="false"
                                                            />
                                                    </Button>
                                                </div>
                                                </div>
                                        ) : null }
                                    </div>) : 
                                        null
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default ServersTable;
