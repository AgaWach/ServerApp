import React, { Component } from 'react';
import { Bar} from 'react-chartjs-2';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

class Chart extends Component {
    constructor(props){
        super(props);
        this.state={
            chartData:{
                labels: ['1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12pm'],
                datasets:[
                    {
                        label: 'Daily use in percentages:',
                        data: [
                            getRandomInt(100), 
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                            getRandomInt(100),
                        ],
                        backgroundColor: '#7AE2E2'
                    }
                ]
            },
        }
    }

    render(){
        return(
                <div className="chart">
                    <Bar 
                    data={this.state.chartData}
                    legendPosition="bottom"
                    />
                </div>
        )
    }
}

export default Chart;