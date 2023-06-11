import { useState, useEffect } from "react";
import {Button, Col, Container, Row, Card, Table} from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './t.css'


const Home = ({}) => {
  const navigate = useNavigate();
  const [myData, setMyData] = useState([]); // get all trips 
  const [myTrips, setMyTrips] = useState([]); // get all trips from user 
 

  useEffect(() => {
    setMyData([ 
      { id: 1, name: "basketball match", date: "01/01/23", time: "9PM EST", location: "New York", duration : "2 hours",guide: {id: 1, name: "john"}, users: [{id:1, name: "tim"},{id: 2, name: "jam"}]},
      { id: 2, name: "lan", date: "01/02/23", time: "10PM EST", location: "New York", duration : "2 hours",guide: {id: 1, name: "john"}, users: [{id:1, name: "tim"},{id: 2, name: "jam"}]},
      { id: 3, name: "concert", date: "01/03/23", time: "11PM EST", location: "New York", duration : "2 hours", guide: {id: 3, name: "john"}, users: [{id:1, name: "tim"},{id: 2, name: "jam"}]},
      { 
        id: 4, 
        name: "fishing", 
        date: "01/04/23", 
        time: "12PM EST", 
        location: "Texas", 
        duration : "2 hours", 
        guide: {id: 4, name: "john"},
        users: [{id:3, name: "nico"},{id: 2, name: "jam"}]
      }
    ])

    setMyTrips([
      { id: 1, name: "basketball match", date: "01/01/23", time: "9PM EST", location: "New York", duration : "2 hours",guide: {id: 1, name: "john"}, users: [{id:1, name: "tim"},{id: 2, name: "jam"}]},
      { id: 2, name: "lan", date: "01/02/23", time: "10PM EST", location: "New York", duration : "2 hours",guide: {id: 1, name: "john"}, users: [{id:1, name: "tim"},{id: 2, name: "jam"}]},
      { id: 3, name: "concert", date: "01/03/23", time: "11PM EST", location: "New York", duration : "2 hours", guide: {id: 3, name: "john"}, users: [{id:1, name: "tim"},{id: 2, name: "jam"}]}
    ])
}, [])


const handleDelete = (e) => { // facade.unJoin(trip_id, userId);
  const trip_id = e.target.id;
  const trip_name = e.target.value;
  setMyTrips(myTrips.filter((trip) => trip.id != trip_id)); // remove the trip from the myTrips state
  alert('Trip deleted!');
}

  const handleJoin = (e) => { // facade.joinTrip(trip_id, username); 
    const trip_id = e.target.id;
    const selectedData = myData.filter((trip) => trip.id == trip_id);
    const filtered = selectedData[0].users.filter((user) => user.name == "tim").length > 0

    if(!filtered) { 
      // facade.joinTrip(trip_id, user.name); // join trip
      notify(trip_id); 
    }
    else {
      notity2(trip_id)
    }
  }

  const notity2 = (trip_id) =>
    toast.error(`You are already joined to trip with nr.${trip_id}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });


  const notify = (trip_id) => 
    toast.success(`You just added trip nr.${trip_id} to your list of joined trips!`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
      <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
        <Row>
          <Col xs={2}></Col>
          <Col >
            <h2>Upcoming Trips</h2>
            <Table  striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Duration</th>
                  <th>Join</th>
                  <th>Guide</th>
                </tr>
              </thead>
              <tbody>
                {myData.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.date}</td>
                    <td>{data.time}</td>
                    <td>{data.location}</td>
                    <td>{data.duration}</td>
                    <td><Button  onClick={(e) => handleJoin(e)} id={data.id} >Join</Button></td>
                    <td> <Link to={`/guideinfo/${data.guide.id}`}
                            key={data.guide.id}>Guide info
                        </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col xs={2}></Col>
        </Row>  
        <br/>

        <Row>
          <Col xs={2}></Col>
          <Col>
            <h2>My Trips</h2>
            <Table  striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Duration</th>
                  <th>Delete</th>
                  <th>Guide</th>
                </tr>
              </thead>
              <tbody>
                {myTrips.map((trip) => (
                  <tr key={trip.id}>
                    <td>{trip.id}</td>
                    <td>{trip.name}</td>
                    <td>{trip.date}</td>
                    <td>{trip.time}</td>
                    <td>{trip.location}</td>
                    <td>{trip.duration}</td>
                    <td><Button variant="danger" id={trip.id} value={trip.name} onClick={(e)=> handleDelete(e)} > Remove</Button></td>
                    <td> 
                      <Link to={`/guideinfo/${trip.guide.id}`}
                        key={trip.guide.id}>Guide info
                      </Link>
                    </td>
                  </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
          <Col xs={2}></Col>
        </Row>  
      </Container>
    ) 
}

export default Home
