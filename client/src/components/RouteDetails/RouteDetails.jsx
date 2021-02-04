import React from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';
import RouteDetail from '../RouteDetail';

    // Display Station schedule for each day in rows

const days = [0,1,2,3,4,5,6];

const RouteDetails = (props) => {
    const [routeName, setRouteName] = React.useState();
    const [routeList, setRouteList] = React.useState([]);
    
    React.useEffect(() => {
        setRouteName(props.match.params.name);
    }, [props.match.params.name]);
    
    React.useEffect(() => {
        async function fetchData (){
           let Data=await axios
           .get(`/stations/name/${routeName}`)
           .then(function(response) {
               return response;
           }).catch(function(error) {
               console.log(error); 
           });
          try {
            setRouteList(Data.data) 
          }catch(error){}
        }
        fetchData()
    }, [routeName]);
    
    function getDay(day) {
        /* eslint-disable */
        switch(day) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
        }
        /* eslint-enable */
    }
    
    function getFunction(route) {
        if (route.length === 0){
            return (
                <p>No data</p>
            );
        } else {
            // Get list of starting stations
            let stationList = route.map((item, index) => item.startingStation);
            // Get list of ending stations
            let stationList2 = route.map((item, index) => item.endingStation);
            // Merge both lists together
            stationList = stationList.concat(stationList2);
            // Only get unique values in the list
            stationList = stationList.filter((value, index, self) => (
                self.indexOf(value) === index
            ));
            // Get list of codes
            let codeList = route.map((item, index) => item.code);
            // Only get unique values in the list
            codeList = codeList.filter((value, index, self) => (
                self.indexOf(value) === index
            ));
            return (
                <table style={{width:"100%"}}>
                    <tbody>
                       <tr>
                          <th rowSpan="2">Code</th>
                            {stationList.map((item, index) => (
                                index > 0 && index < stationList.length-1 ? <th key={index + item} colSpan="2">{item}</th> :  <th key={index + item}>{item}</th>
                            ))}
                       </tr>
                       <tr>
                           {stationList.map((item, index) => (
                                index === 0 ? <td key={index + item + "Departure"}>Departure</td> : index === stationList.length-1 ? <td key={index + item + "Arrival"}>Arrival</td> : [<td key={index + item + "Arrival"}>Arrival</td>,<td key={index + item + "Departure"}>Departure</td>]
                            ))}
                       </tr>
                       {codeList.map((code) => (
                            <tr key={code}>
                                <td>{code}</td>
                                {route.filter((line) => line.code === code).map((item, index) => (
                                    [
                                        <td key={code + "Departure"}>{DateTime.fromISO(item.departure).toLocaleString(DateTime.TIME_SIMPLE)}</td>,
                                        <td key={code + "Arrival"}>{DateTime.fromISO(item.arrival).toLocaleString(DateTime.TIME_SIMPLE)}</td>
                                    ]
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    }
    
    return (
        <div>
            <h1>{routeName}</h1>
            {days.map((day) => (
                <div key={day}>
                    <h1>{getDay(day)}</h1>
                    {getFunction(routeList.filter((route) => route.day === day))}
                </div>
            ))}  
        </div>
    );
}

export default RouteDetails;