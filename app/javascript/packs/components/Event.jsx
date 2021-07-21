import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

const Event = props => {
  const [event, setEvent] = useState([]);
  const [isLoading, setLoading] = useState(true);

  return (
      <Card style={{ width: '48rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
        <Button variant="primary">Reserve my spot </Button>
      </Card.Body>
      </Card>
  )
}

export default Event

Event.propTypes = {
  event: PropTypes.object.isRequired,
}