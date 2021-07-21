import React, { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import Event from './Event';
import Spinner from './Spinner';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await axios("/api/v1/home");
      console.log(result);
      setEvents(result.data);
      setLoading(false)
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {events.length && (
        <Row xs={1} md={1} className="g-5">
          {events.map((event) => (
            <Col>
              <Link to={`/events/${event.id}`} className="btn btn-link">
                <Event event={event}/>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default Events
