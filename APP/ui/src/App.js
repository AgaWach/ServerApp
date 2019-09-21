import React, {Component} from 'react';
import Title from './components/Title';
import NavBar from './components/NavBar';
import './App.css';
import Container from '@material-ui/core/Container'
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servers: [],
            result: []
        };
    }

    async getServers() {
        return axios.get('http://localhost:4454/servers');
    }

    render() {
        return (
            <div>
                <Title/>
                < Container
                    maxWidth="md">
                    <NavBar getServers={this.getServers}/>
                </Container>
            </div>
        );
    }
}


export default App;
