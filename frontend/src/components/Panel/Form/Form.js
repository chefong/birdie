import React, { Component } from 'react';
import './Form.css';
import logo from '../../../assets/logo.svg';
import { Input, DatePicker, Slider, Button, Spin, Icon, Select, Alert } from 'antd';
import { BASE_URL } from '../../../constants';
import axios from 'axios';

const { Option } = Select;

class Form extends Component {
  state = {
    date: '',
    location: '',
    isLoading: false,
    distance: 100,
    hashTags: []
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  handleDistanceChange = distance => this.setState({ distance });

  handleDateChange = (date, dateString) => this.setState({ date });

  handleSelectChange = hashTags => this.setState({ hashTags });

  handleClick = e => {
    e.preventDefault();
    
    this.setState({ isLoading: true });

    const { location, date, distance, hashTags } = this.state;
    const data = { location, date, distance, hashTags };

    setTimeout(() => {
      this.props.handleSubmit(data);
      this.setState({ isLoading: false });
    }, 1000);

    // Fetch data here
    // axios.post(`${BASE_URL}`, { ...data })
    //   .then(response => {
    //     console.log("Got response after submitting form", response);
    //     this.props.handleSubmit(response);
    //   })
    //   .catch(error => {
    //     console.log("Error after submitting form", error)
    //   });
  }

  render() {
    const { location, distance, isLoading, message } = this.state;
    
    return (
      <div className="form__container">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <img className="form__logo" src={logo} alt=""/>
          </div>
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="form__label">Location</div>
              <Input
                placeholder="Enter a location..."
                name="location"
                onChange={this.handleInputChange}
                value={location}
                className="form__location"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="form__label">Date</div>
              <DatePicker
                onChange={this.handleDateChange}
                className="form__date"
                format="MM/DD/YYYY"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="form__label">Hash Tags</div>
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Tags Mode"
                onChange={this.handleSelectChange}
                className="form__select"
              >
              </Select>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="form__label">Distance: {distance} miles</div>
              <Slider
                onChange={this.handleDistanceChange}
                tooltipPlacement="bottom"
                defaultValue={distance}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="form__submit--wrapper">
              <Button
                className="form__submit"
                onClick={this.handleClick}
                type="primary"
              >
                Submit
              </Button>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-10">
              {!isLoading && message && (
                <Alert
                  message={message}
                  type="warning"
                  className="form__alert"
                />
              )}
            </div>
            <div className="col-10">
              <div className="form__loading--wrapper">
                {isLoading && (
                  <Spin
                    spin
                    className="form__loading"
                    indicator={<Icon type="loading" style={{ fontSize: 32 }} />}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Form;