import React, { Component } from 'react';
import './Tweet.css';
import Fade from 'react-reveal/Fade';
import { getTimeSince } from '../../../../helpers';

class Tweet extends Component {
  handleTweetHover = (e, coordinates) => {
    e.preventDefault();
    this.props.handleTweetHover(coordinates);
  }

  render() {
    const { user, content: text, date: timestamp, coordinates } = this.props;
    const { name, url: profileUrl, profile_image_url_https: profileImageUrl, screen_name: screenName } = user;
    const timeSince = getTimeSince(timestamp);

    return (
      <Fade>
        <div
          className="tweet__container"
          onMouseEnter={e => this.handleTweetHover(e, coordinates)}
          onMouseLeave={e => this.handleTweetHover(e, [])}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-2">
                <img className="tweet__user--image" src={profileImageUrl} alt=""/>
              </div>
              <div className="col-10">
                <div className="tweet__user--name">
                  <strong>{name}</strong>
                  <a className="tweet__user--url" target="_blank" href={profileUrl}>@{screenName}</a>
                </div>
                <div className="tweet__date">{timeSince}</div>
                <div className="tweet__text">{text}</div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    )
  }
}

export default Tweet;