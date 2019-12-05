from json import JSONDecoder, JSONDecodeError
from elasticsearch import Elasticsearch
from elasticsearch import helpers

import requests, json, os, re

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

def gendata():
    #file path to json file
    directory = 'tweetsParsed.json'

    file_input = open(directory, 'r')
    file_read = file_input.read()

    for obj in decode_stacked(file_read):
        yield {
            "_index": "tweet172",
            "_source": {
                "content": obj["content"],
                "coordinates": obj["coordinates"],
                "date": obj["date"],
                "user": obj["user"]["user"],
                "entities": obj["entities"],
                "title": obj["title"]
            }
        }


if __name__ == '__main__':
    # by default we connect to localhost:9200
    es = Elasticsearch("https://ayvv1ysa0x:5yb4lybdko@tweets-2904168154.us-west-2.bonsaisearch.net:443")

    response = helpers.bulk(es, gendata())
    print(response)


    # print ("helpers.bulk() RESPONSE:", json.dumps(response, indent=4))
