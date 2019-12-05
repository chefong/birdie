import simplejson as json
import urllib3
import urllib.request
import requests, json, os, re
import string
from bs4 import BeautifulSoup
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from geopy.geocoders import Nominatim
from json import JSONDecoder, JSONDecodeError

import config

count = 0
NOT_WHITESPACE = re.compile(r'[^\s]')

def decode_stacked(document, pos=0, decoder=JSONDecoder()):
    while True:
        match = NOT_WHITESPACE.search(document, pos)
        if not match:
            return
        pos = match.start()

        try:
            obj, pos = decoder.raw_decode(document, pos)
        except JSONDecodeError:
            # do something sensible if there's some error
            raise
        yield obj

def scrapePage(urls, newObject):
    url = urls[0]["expanded_url"]

    try:
        if "twitter" not in url and "instagram" not in url: #don't want urls to other tweets
            webpage = urllib.request.urlopen(url).read()
            title = str(webpage).split('<title>')[1].split('</title>')[0]

            if len(title) > 0:
                title = title.translate(str.maketrans('', '', string.punctuation))
                printable = set(string.printable)
                filter(lambda x: x in printable, title) #gets rid of hex values in titles

                newObject["title"] = title
                newObject["url"] = url
    except:
        print("failed url parse")
        pass

def filterJson():
    #file path to json file
    directory = 'tweets.json'

    file_input = open(directory, 'r')
    file_read = file_input.read()

    for tweet in decode_stacked(file_read):
        newObject = {}

        if "lang" in tweet and tweet["lang"] == "en":
            if "extended_tweet" in tweet:
                newObject["content"] = tweet["extended_tweet"]["full_text"]
            else:
                newObject["content"] = tweet["text"]

            newObject["user"] = {
                "user": tweet["user"]
            }
            newObject["entities"] = {
                "hashtags": tweet["entities"]["hashtags"],
                "urls": tweet["entities"]["urls"]
            }

            newObject["date"] = tweet["created_at"]
            newObject["title"] = None
            newObject["coordinates"] = None

            if len(tweet["entities"]["urls"]) > 0:
                scrapePage(tweet["entities"]["urls"], newObject)

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

            if newObject["coordinates"] != None:
                with open("tweetsParsed.json", 'a') as tf:
                    global count
                    print(count)
                    count += 1
                    json.dump(newObject, tf)




if __name__ == '__main__':
    filterJson()
