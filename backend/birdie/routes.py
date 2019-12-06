from birdie import app
from flask import jsonify, json, request
from elasticsearch import Elasticsearch
from math import radians, cos, sin, asin, sqrt # For coord radii
from haversine import haversine, Unit

#import smallestenclosingcircle

# # Brute force method to calculate farthest points
# def farthest_points(points):
#     dist = 0
#     i = 0
#     for i < len(points) - 1:
#         j = i + 1
#         for j < len(points):
#             curr_dist = sqrt((points[i] - points[j])**2 + (points[i] - points[j])**2)
#             dist = max(dist, curr_dist)
#             j += 1
#         i += 1
#     return dist

def getCoordinates(tweetObjects):
  all_coordinates = []

  for tweet_json in tweetObjects:
    coordinates = tweet_json['_source']['coordinates']
    all_coordinates.append(coordinates)

  return all_coordinates

def getMaxDistance(all_coordinates):
  max_distance = -1

  for i in range(len(all_coordinates)):
    for j in range(i + 1, len(all_coordinates)):
      a, b = all_coordinates[i], all_coordinates[j]
      distance = haversine(a, b, unit=Unit.MILES)
      max_distance = max(max_distance, distance)
  
  return max_distance

@app.route("/search", methods=["POST"])
def query():
    es = Elasticsearch("https://ayvv1ysa0x:5yb4lybdko@tweets-2904168154.us-west-2.bonsaisearch.net:443")

    if request.get_json():
        valid_tweets = []

        data = request.get_json()
        input = data["query"]
        # Coordinates come in as latitude, longitude
        latitude = data["latitude"]
        longitude = data["longitude"]
        is_distance_restricted = data["isDistanceRestricted"]
        searchBy = data["searchBy"]
        numResults = data["numResults"]
        user_distance = float(data["distance"])
        user_hashtags = data["hashTags"]

        # print("latitude: ", latitude)
        # print("longitude: ", longitude)

        if searchBy == 'Title':
            print("searching by title")
            query = {
              "query": {
                "bool" : {
                  "must" : {
                    "match" : { "title": input }
                  }
                }
              }
            }

        else:
            query = {
              "query": {
                "bool" : {
                  "must" : {
                    "match" : { "content": input }
                  }
                }
              }
            }

        res = es.search(index="tweet172", body=query, size=numResults)
        tweetObjects = res['hits']['hits']
        # List of pairs representing coordinates
        # Lat = Y, Long = X, per https://gis.stackexchange.com/a/68856
        coords = []

        for tweet_json in tweetObjects:
            hashtags = tweet_json['_source']['entities']['hashtags']
            hashtag_texts = []

            for hashtag in hashtags:
              text = hashtag['text']
              hashtag_texts.append(text)
            
            skip = False
            for word in user_hashtags:
              if word not in hashtag_texts:
                skip = True

            if skip:
              continue

            if not is_distance_restricted:
              valid_tweets.append(tweet_json)
            elif len(tweet_json['_source']['coordinates']) > 0:
                #distance = coord_dist(tweet_coord_long, tweet_coord_lat, longitude, latitude)
                input_list = [latitude, longitude]

                distance = haversine(tweet_json['_source']['coordinates'], input_list, unit=Unit.MILES)

                coords.append(tweet_json['_source']['coordinates'])

                if distance <= user_distance:
                    valid_tweets.append(tweet_json)

        all_coordinates = getCoordinates(valid_tweets)
        print("Got all coordinates")
        max_distance = getMaxDistance(all_coordinates)

        print("Got max distance", max_distance)

        # circle = make_circle(coords)
        # center_x = circle[0]
        # center_y = circle[1]
        # # radius = circle[2]
        # valid_tweets["Center"] = [(9, 8)]
        #
        # max_dist = farthest_points(coords)
        # valid_tweets["Max Dist"] = max_dist
        # print(valid_tweets)
        return jsonify({
            "result": valid_tweets,
            "maxDistance": max_distance
        })
    else:
        return "no input provided"
    return "no input provided"
