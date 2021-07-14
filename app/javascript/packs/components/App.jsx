import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Events from './Events';
import Event from './Event';
import EventForm from './EventForm';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

class App extends React.Component {
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
      .get("/api/v1/events")
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
          <>
            <EventForm
              createEvent={this.createEvent}
              handleErrors={this.handleErrors}
              clearErrors={this.clearErrors}
            />
              <Events>
                {this.state.events.map(event => (
                  <Event
                    key={event.id}
                    event={event}
                    getEvents={this.getEvents}
                    handleErrors={this.handleErrors}
                    clearErrors={this.clearErrors}
                  />
                ))}
              </Events>
          </>
        )}
        {this.state.isLoading && <Spinner />}
      </>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('event-app')
  app && ReactDOM.render(<App />, app)
})
