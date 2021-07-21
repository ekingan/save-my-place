import React from 'react';
import { Button, Card, Nav } from 'react-bootstrap';
import axios from "axios";
import Events from './Events';
import Event from './Event';
import EventForm from './EventForm';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoading: true,
      errorMessage: null,
    };
    this.getEvents = this.getEvents.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    axios
      .get("/api/v1/events?mine=true")
      .then(response => {
        this.clearErrors();
        this.setState({ isLoading: true });
        const events = response.data;
        console.log({events})
        this.setState({ events });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
        this.setState({
          errorMessage: {
            message: 'There was an error loading your events.'
          }
        });
        console.log(error);
      });
  }

  createEvent(event) {
    const events = [event, ...this.state.events];
    this.setState({ events });
  }

  handleErrors(errorMessage) {
    this.setState({ errorMessage });
  }
  clearErrors() {
    this.setState({
      errorMessage: null
    });
  }

  render() {
    return (
      <>
        {this.state.errorMessage && (
          <ErrorMessage errorMessage={this.state.errorMessage} />
        )}
        {!this.state.isLoading && (
          <Card>
            <Card.Header>
              <Nav variant="pills" defaultActiveKey="#first">
                <Nav.Item>
                  <Nav.Link href="#first">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#link">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#disabled" disabled>
                    Disabled
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        )}
        {this.state.isLoading && <Spinner />}
      </>
    );
  }
}

export default MyEvents;
