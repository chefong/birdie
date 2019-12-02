import simplejson as json
import urllib3
import urllib.request
import string
from bs4 import BeautifulSoup
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
<<<<<<< HEAD
from geopy.geocoders import Nominatim

import config

count = 0


=======

import config

>>>>>>> b9eedffb94da14977706dd5be6fd12086851bb3e
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
<<<<<<< HEAD
        jsonList = []

=======
>>>>>>> b9eedffb94da14977706dd5be6fd12086851bb3e
        try:
            newObject = {}
            tweet = json.loads(data)
            if tweet["lang"] == "en":
                if "extended_tweet" in tweet:
                    newObject["content"] = tweet["extended_tweet"]["full_text"]
                else:
                    newObject["content"] = tweet["text"]
<<<<<<< HEAD

                newObject["user"] = {
                    "name": tweet["user"]["screen_name"],
=======
                newObject["user"] = {
                    "name": tweet["user"]["screen_name"],
                    "location": tweet["user"]["location"]
>>>>>>> b9eedffb94da14977706dd5be6fd12086851bb3e
                }
                newObject["entities"] = {
                    "hashtags": tweet["entities"]["hashtags"],
                    "urls": tweet["entities"]["urls"]
                }
<<<<<<< HEAD
                newObject["date"] = tweet["created_at"]
                newObject["title"] = None
                newObject["coordinates"] = None

                if len(tweet["entities"]["urls"]) > 0:
                    self.scrapePage(tweet["entities"]["urls"], newObject)


                try:
                    newObject["coordinates"] = tweet["coordinates"]["coordinates"]
                except:
                    try:
                        temp = tweet["user"]["location"]
                        geolocator = Nominatim(user_agent="cs172")
                        location = geolocator.geocode(temp)
                        newObject["coordinates"] = [location.latitude, location.longitude]
                    except:
                        pass
                    pass


                with open("tweets.json", 'a') as tf:
                    global count
                    print(count)
                    count += 1

                    json.dump(newObject, tf)

            return True

        # except BaseException as e:
        #     #exception if it doesn't meet the criteria
        #     pass

        except IncompleRead:
            #streaming tweets faster than processesing so script breaks
=======

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
>>>>>>> b9eedffb94da14977706dd5be6fd12086851bb3e
            pass

        return True

    def on_error(self, status):
<<<<<<< HEAD
        print("status error", status)
        return
=======
        print(status)
>>>>>>> b9eedffb94da14977706dd5be6fd12086851bb3e

if __name__ == '__main__':

    twitter_streamer = TwitterStreamer()
    twitter_streamer.stream_tweets()
