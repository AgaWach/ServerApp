import React, {Component} from 'react';
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import Chart from './Chart';

class ServersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false,
            chosenServerId: '',
            servers: [],
        };
    };

    async turn(serverId, action) {
        this.setState({
            servers: this.props.servers,
        });
        const result = await axios.put(`http://localhost:4454/servers/${serverId}/${action}`);
        console.log({result});
        if (result.status === 200) {
            const serverIndex = this.props.servers.findIndex(x => x.id === result.data.id);
            if (serverIndex > -1) {
                if (result.data.status === 'REBOOTING') {
                    let server = {};
                    server = this.rebooting(serverId, server);
                    console.log({server});
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
        setInterval(async () => {
            server = await axios.get(`http://localhost:4454/servers/${serverId}/`);
            console.log(server);
            if (server.data.status === 'REBOOTING') {
                await this.rebooting(serverId, server)
            } else {
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
                            <TableCell align="right">STATISTIC</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.servers.map(server => (
                            <TableRow key={server.name}>
                                <TableCell component="th" scope="row">
                                    {server.name}
                                </TableCell>
                                <TableCell align="left">{server.status}</TableCell>
                                <TableCell align="right">
                                        {
                                            server.status === 'ONLINE' ? (
                                                <div>
                                                    <div>
                                                        <Paper>
                                                        <Button onClick={() => this.turn(server.id, 'off')}>
                                                          Turn Off </Button>
                                                        <Button onClick={() => this.turn(server.id, 'reboot')}>Reboot</Button>
                                                        <Chart />
                                                        </Paper>
                                                    </div>
                                                </div>
                                            ) : (
                                                null
                                            )
                                        }
                                        {
                                            server.status === 'OFFLINE' ? (
                                                <div>
                                                    <Paper>
                                                    <Button onClick={() => this.turn(server.id, 'on')}>
                                                      Turn on
                                                    </Button>
                                                    <Button onClick={() => this.turn(server.id, 'reboot')}>
                                                      Reboot
                                                    </Button>
                                                    <Chart />
                                                    </Paper>
                                                </div>
                                            ) : (
                                                null
                                            )
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
