import React, { Component } from 'react';
import './Form.css';
import logo from '../../../assets/logo.svg';
import { Input, Slider, Button, Spin, Icon, Select, Alert, Switch } from 'antd';
import { BASE_URL, NO_RESULT_MESSAGE, NUM_SEARCH_RESULTS } from '../../../constants';
import axios from 'axios';
import Fade from 'react-reveal/Fade';

const { Option } = Select;

class Form extends Component {
  state = {
    query: '',
    message: '',
    searchBy: 'Content',
    isLoading: false,
    isDistanceRestricted: true,
    distance: 100,
    hashTags: [],
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  handleDistanceChange = distance => this.setState({ distance });

  handleSelectChange = hashTags => this.setState({ hashTags });

  handleToggleChange = toggled => this.setState({ isDistanceRestricted: toggled });

  handleSearchByChange = value => this.setState({ searchBy: value });

  componentDidMount = () => {
    const query = localStorage.getItem("query");
    const searchBy = localStorage.getItem("searchBy");
    const isDistanceRestricted = localStorage.getItem("isDistanceRestricted");
    const distance = localStorage.getItem("distance");
    const hashTags = localStorage.getItem("hashTags");

    if (query) this.setState({ query });
    if (searchBy) this.setState({ searchBy });
    if (isDistanceRestricted !== null) this.setState({ isDistanceRestricted });
    if (distance) this.setState({ distance });
    if (hashTags.length > 0) this.setState({ hashTags });
  }

  componentDidUpdate = () => {
    const { query, searchBy, isDistanceRestricted, distance, hashTags } = this.state;
    localStorage.setItem("query", query);
    localStorage.setItem("searchBy", searchBy);
    localStorage.setItem("isDistanceRestricted", isDistanceRestricted);
    localStorage.setItem("distance", distance);
    localStorage.setItem("hashTags", hashTags);
  }

  handleClick = e => {
    e.preventDefault();
    
    this.setState({ isLoading: true });

    const { query, distance, hashTags, isDistanceRestricted, searchBy } = this.state;
    const { draggableMarkerCoordinates } = this.props;
    const [latitude, longitude] = draggableMarkerCoordinates;
    const data = { query, numResults: NUM_SEARCH_RESULTS, distance, hashTags, latitude, longitude, isDistanceRestricted, searchBy };

    console.log("Posting data", data);

    axios.post(`${BASE_URL}/search`, { ...data })
      .then(response => {
        console.log("Got response after submitting form", response);
        const { data, status, message } = response;
        const { result, maxDistance } = data;
        if (status !== 200) {
          throw new Error(message);
        } else if (result && result.length === 0) {
          this.setState({ message: NO_RESULT_MESSAGE });
          this.props.clearMapData();
        } else {
          this.setState({ message: "" });
          this.props.handleSubmit(result, maxDistance);
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log("Error after submitting form", error);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { query, distance, isLoading, message, isDistanceRestricted, searchBy, hashTags, numResults } = this.state;
    
    return (
      <div className="form__container">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <img className="form__logo" src={logo} alt=""/>
          </div>
          <Fade>
            <div className="row justify-content-center">
              <div className="col-10">
                <div className="form__label">{`Search by ${searchBy}`}</div>
                <Input
                  placeholder={`Search by ${searchBy.toLowerCase()}`}
                  name="query"
                  onChange={this.handleInputChange}
                  value={query}
                  className="form__query"
                  addonBefore={
                    <Select onChange={this.handleSearchByChange} value={searchBy} defaultValue={searchBy} style={{ width: 90 }}>
                      <Option value="Content">Content</Option>
                      <Option value="Title">Title</Option>
                    </Select>
                  }
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-10">
                <div className="form__label">Hashtags</div>
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Enter hashtags"
                  onChange={this.handleSelectChange}
                  className="form__select"
                  value={hashTags}
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
                  disabled={!isDistanceRestricted}
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-10">
                <div className="form__label">Restrict Distance</div>
                <Switch
                  className="form__toggle"
                  onChange={this.handleToggleChange}
                  checked={isDistanceRestricted}
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
          </Fade>
        </div>
      </div>
    )
  }
}

export default Form;