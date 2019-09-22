import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import ServersTable from "./ServersTable";
import Chart from './Chart';


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            searchResult: []
        }
    }

    handleChange = event => {
        var updatedList = this.state.result;
        updatedList = updatedList.filter(function (item) {
            return item.name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({searchResult: updatedList});
    }

    async componentDidMount() {
        const servers = await this.props.getServers();
        this.setState({
            result: servers.data,
            searchResult: servers.data
        })
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar className="Navbar_Toolbar">
                        <div>
                            <Typography display="block" variant="h6" noWrap>
                                Servers
                                <Typography>
                                    Number of elements: {this.state.searchResult.length}
                                </Typography>
                            </Typography>
                        </div>
                        <div>
                            <div className = "Navbar_Search">
                                <SearchIcon/>
                                <input className ="Navbar_Search_Input"
                                    type="text"
                                    placeholder="Search"
                                    onChange={this.handleChange}/>
                            </div>
                            <Chart />
                        </div>
                    </Toolbar>
                </AppBar>
                <ServersTable servers={this.state.searchResult}/>
            </div>
        );
    }
}

export default NavBar
