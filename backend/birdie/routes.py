from flask import jsonify, json, request
from elasticsearch import Elasticsearch
from math import radians, cos, sin, asin, sqrt # For coord radii

# Haversine formula code referred heavily to: https://stackoverflow.com/questions/4913349/haversine-formula-in-python-bearing-and-distance-between-two-gps-points
def coord_dist(long1, lat1, long2, lat2):
    # Convert degrees to rad
    long1, lat1, long2, lat2 = map(radians, [long1, lat1, long2, lat2])

    # Haversine formula for great-circle distance
    dist_long = long2 - long1
    dist_lat = lat2 - lat1
    a = sin(dist_lat / 2) ** 2 + cos(lat1) * sin(dist_long / 2) ** 2
    c = 2 * asin(sqrt(a))
    r = 3956 # Radius of Earth in miles
    return c * r

@app.route("/search", methods=["POST"])
def query():
    es = Elasticsearch("https://ayvv1ysa0x:5yb4lybdko@tweets-2904168154.us-west-2.bonsaisearch.net:443")

    if request.get_json():
        valid_tweets = []

        data = request.get_json()
        input = data["query"]
        # Coordinates come in as latitude, longitude
        coordinates = data["coordinates"]
        searchBy = data["searchBy"]

        if searchBy == 'title':
            query = {
              "query": {
                "bool" : {
                  "must" : {
                    "term" : { "title": input }
                  }
                }
              }
            }

        else:
            query = {
              "query": {
                "bool" : {
                  "must" : {
                    "term" : { "content": input }
                  }
                }
              }
            }

        res = es.search(index="tweetes", body=query)
        tweetObjects = res['hits']['hits']

        for tweet_json in tweetObjects:
            if len(tweet_json['_source']['coordinates']) > 0:
                # Tweet coordinates come in as latitude, longitude
                tweet_coord_lat = tweet_json['_source']['coordinates'][0]
                tweet_coord_long = tweet_json['_source']['coordinates'][1]

                distance = coord_dist(tweet_coord_long, tweet_coord_lat, coordinates[1], coordinates[0])
                print(tweet_json)
                print(distance)

                if distance <= 100:
                    valid_tweets.append(tweet_json)

        print(valid_tweets)
        return jsonify(res['hits']['hits'])
    else:
        return "no input provided"
    return "no input provided"
