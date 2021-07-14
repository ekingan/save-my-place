import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleDestroy = this.handleDestroy.bind(this);
    this.path = `/api/v1/events/${this.props.event.id}`;
    this.handleChange = this.handleChange.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.inputRef = React.createRef();
    this.completedRef = React.createRef();
  }
  handleChange() {
    this.updateEvent();
  }
  updateEvent = _.debounce(() => {
    setAxiosHeaders();
    axios
      .put(this.path, {
        event: {
          title: this.inputRef.current.value
        }
      })
      .then(response => {
        this.props.clearErrors();
      })
      .catch(error => {
        console.log(error);
        this.props.handleErrors(error);
      });
  }, 1000);

  handleDestroy() {
    setAxiosHeaders();
    const confirmation = confirm("Are you sure?");
    if (confirmation) {
      axios
        .delete(this.path)
        .then(response => {
          this.props.getEvents();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  render() {
    const { event } = this.props
    return (
      <tr className='table-light'>
        <td>
          <svg
            className="bi bi-check-circle text-success"
            width="2em"
            height="2em"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z"
              clipRule="evenodd"
            />
          </svg>
        </td>
        <td>
          <input
            type="text"
            defaultValue={event.title}
            disabled={false}
            onChange={this.handleChange}
            ref={this.inputRef}
            className="form-control"
            id={`event__title-${event.id}`}
          />
        </td>
        <td className="text-right">
          <div className="form-check form-check-inline">
            <input
              type="boolean"
              defaultChecked={false}
              onChange={this.handleChange}
              ref={this.completedRef}
              type="checkbox"
              className="form-check-input"
              id={`complete-${event.id}`}
            />
            <label
              className="form-check-label"
              htmlFor={`complete-${event.id}`}
            >
              Complete?
            </label>
          </div>
          <button className="btn btn-outline-danger" onClick={this.handleDestroy}>Delete</button>
        </td>
      </tr>
    )
  }
}

export default Event

Event.propTypes = {
  event: PropTypes.object.isRequired,
  getEvents: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
}
