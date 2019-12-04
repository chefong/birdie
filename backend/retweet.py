import simplejson as json
import urllib3
import urllib.request
import string
from bs4 import BeautifulSoup
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from geopy.geocoders import Nominatim

import config

count = 0

class TwitterStreamer():
    def __init__(self):
        pass

    def stream_tweets(self):
        listener = StdOutListener()
        auth = OAuthHandler(config.api_key, config.api_secret_key)
        auth.set_access_token(config.access_token, config.access_token_secret)
        stream = Stream(auth, listener, tweet_mode='extended')

        stream.sample()

class StdOutListener(StreamListener):
    def __init__(self):
        pass

    def on_data(self, data):
        try:
            tweet = json.loads(data)

            with open("tweets.json", 'a') as tf:
                global count
                print(count)
                count += 1

                json.dump(tweet, tf)

            return True

        except BaseException as e:
            pass

        return True

    def on_error(self, status):
        print("status error", status)
        return

if __name__ == '__main__':

    twitter_streamer = TwitterStreamer()
    twitter_streamer.stream_tweets()
