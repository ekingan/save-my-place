import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import setAxiosHeaders from "./AxiosHeaders";
class EventForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.titleRef = React.createRef()
  }

  handleSubmit(e) {
    e.preventDefault();
    setAxiosHeaders();
    axios
      .post('/api/v1/events', {
        event: {
          title: this.titleRef.current.value,
          start_time: "2021-07-22",
        },
      })
      .then(response => {
        const event = response.data;
        this.props.createEvent(event);
        this.props.clearErrors();
      })
      .catch(error => {
        console.log(error);
        this.props.handleErrors(error);
      })
    e.target.reset()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="my-3">
        <div className="form-row">
          <div className="form-group col-md-8">
            <input
              type="text"
              name="title"
              ref={this.titleRef}
              required
              className="form-control"
              id="title"
              placeholder="Write your event item here..."
            />
          </div>
          <div className="form-group col-md-4">
            <button className="btn btn-outline-success btn-block">
              Add Event
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default EventForm

EventForm.propTypes = {
  createEvent: PropTypes.func.isRequired,
  handleErrors: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
}
