import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import {DateTime} from 'luxon';
import {ListItem} from '../../components/ListItem';
import './RoutesList.css';
import { ListSubItem } from '../../components/ListSubItem';

// JS class rendering the Route page of the navbar
class RoutesList extends Component {
    constructor() {
        super();
        this.state = {
            routes: [],
            connection: 0
        }
        this.getRoutes = this.getRoutes.bind(this);
        this.connectionError = this.connectionError.bind(this);
    }
    
    componentDidMount() {
        this.getRoutes();
    }
    
    // function returning route information for each day
    async getRoutes() {
        let currentDay = new Date().getDay();
        let data = await axios
            .get(`/routes/day/${currentDay}`)
            .then(function(response) {
                return response;
            }).catch(function(error) {
                console.log(error);
            });
        try {
            this.setState({routes: data.data});
            if (this.state.routes.length > 0) {
                this.setState({connection: 1});
            } else {
                this.setState({connection: 2});
            }
        } catch(error) {
            console.log(error);
            this.setState({connection: -1});
        } 
    }
    
    connectionError() {
        console.log('error');
    }
    
    // JSX rendering Route List information on Route page of the navbar
    render() {
        if (this.state.connection === -1) {
            console.log('Error');
            return (
                <div className="ui container routesList">
                    <h2>Routes List Currently Unavailable</h2>
                    <p>Please try again later. We apologize for the inconvenience.</p>
                </div>
            );
        } else if (this.state.connection === 1) {
            return (
                <div className="ui container routesList">
                    <h2>Routes List</h2>
                    <h4>Schedule Timezone: America/Edmonton</h4>
                    <h4>Your Timezone: {DateTime.local().zoneName}</h4>
                    {console.log(DateTime.local().weekday)}
                    <table style={{width:"100%"}}>
                        <thead>
                            <tr>
                                <th>Route</th>
                                <th>Departure Time</th>
                                <th>Arrival Time</th>
                                <th>Fare</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.routes.map((route, index) => (
                             <ListItem key={route._id} id={index} data={[route.name, DateTime.fromISO(route.departure).toLocaleString(DateTime.TIME_SIMPLE), DateTime.fromISO(route.arrival).toLocaleString(DateTime.TIME_SIMPLE), route.fare]}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else if (this.state.connection === 2) {
            return (
                <div className="ui container routesList">
                    <h2>Routes List</h2>
                    <p>There are no more trains operating today</p>
                </div>
            );
        } else {
            return (
                <div className="ui container routesList">
                    <h2>Routes List</h2>
                    <p>Loading...</p>
                </div>
            );
        }  
    }
};

export default RoutesList;

/* <ListItem key={route._id} id={index} data={[route.name, DateTime.fromISO(route.departure).toLocaleString(DateTime.TIME_SIMPLE), DateTime.fromISO(route.arrival).toLocaleString(DateTime.TIME_SIMPLE), route.fare]}/> */