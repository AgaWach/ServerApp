import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

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
                        label: 'CPU Utilization',
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
                        backgroundColor: '#000551'
                    }
                ]
            },
            pieData:{
                labels: ['Excellent signal', 'Unstable signal', 'No signal'],
                datasets:[
                    {
                        label: 'Conection quality',
                        data: [
                            getRandomInt(100), 
                            getRandomInt(10),
                            getRandomInt(3),
                        ],
                        backgroundColor: [
                            '#009F28',
                            '#F9FF9A',
                            '#FF6075',
                        ]
                    }
                ]
            }
        }   
    }

    render(){
        return(
                <div className="chart">
                    <Bar 
                    data={this.state.chartData}
                    legendPosition="bottom"
                    />
                    <Pie
                    data={this.state.pieData}
                    legendPosition="bottom"
                    />
                </div>
        )
    }
}

export default Chart;