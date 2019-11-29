import simplejson as json
import urllib3
import urllib.request
import string
from bs4 import BeautifulSoup
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

import config

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

    def scrapePage(self, urls, newObject):
        url = urls[0]["expanded_url"]

        if "twitter" not in url and "instagram" not in url: #don't want urls to other tweets
            webpage = urllib.request.urlopen(url).read()
            title = str(webpage).split('<title>')[1].split('</title>')[0]

            if len(title) > 0:
                title = title.translate(str.maketrans('', '', string.punctuation))
                printable = set(string.printable)
                filter(lambda x: x in printable, title) #gets rid of hex values in titles

                newObject["title"] = title
                newObject["url"] = url

    def on_data(self, data):
        try:
            newObject = {}
            tweet = json.loads(data)
            if tweet["lang"] == "en":
                if "extended_tweet" in tweet:
                    newObject["content"] = tweet["extended_tweet"]["full_text"]
                else:
                    newObject["content"] = tweet["text"]
                newObject["user"] = {
                    "name": tweet["user"]["screen_name"],
                    "location": tweet["user"]["location"]
                }
                newObject["entities"] = {
                    "hashtags": tweet["entities"]["hashtags"],
                    "urls": tweet["entities"]["urls"]
                }

                if len(tweet["entities"]["urls"]) > 0:
                    self.scrapePage(tweet["entities"]["urls"], newObject)
                    if "title" in newObject:
                        print("this is title", newObject["title"])
                        print("this is url", newObject["url"])

                # newObject["date"] = tweet["created_at"]
                # with open("tweets.json", 'a') as tf:
                #     json.dump(newObject, tf)
            return True

        except BaseException as e:
            pass

        return True

    def on_error(self, status):
        print(status)

if __name__ == '__main__':

    twitter_streamer = TwitterStreamer()
    twitter_streamer.stream_tweets()
