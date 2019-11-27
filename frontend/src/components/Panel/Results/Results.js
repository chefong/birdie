import React, { Component } from 'react';
import './Results.css';
import logo from '../../../assets/logo.svg';
import { Button } from 'antd';
import Fade from 'react-reveal/Fade';
import Tweet from './Tweet/Tweet';

class Results extends Component {
  handleBackClick = e => {
    e.preventDefault();
    this.props.clearData();
  }

  render() {
    const { data: { tweets } } = this.props;

    return (
      <Fade>
        <div className="results__container">
          <div className="container-fluid">
            <div className="row justify-content-start">
              <div className="col-1">
                <Button
                  type="secondary"
                  className="results__back"
                  onClick={this.handleBackClick}
                  icon="caret-left"
                >
                  Back
                </Button>
              </div>
              <div className="col-10">
                <div className="results__logo--wrapper">
                  <img className="results__logo" src={logo} alt=""/>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="results__data">
                  {tweets.length > 0 && tweets.map(tweet => {
                    const { id } = tweet;
                    return <Tweet key={id} {...tweet} />
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    )
  }
}

export default Results;