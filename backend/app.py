from birdie import app
from flask import Flask
import config
import tweepy


auth = tweepy.OAuthHandler(config.api_key, config.api_secret)
api = tweepy.API(auth)


if __name__ == '__main__':
    app.run(debug=True)
