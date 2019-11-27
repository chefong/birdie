from birdie import app
from flask import Flask, request
from config import *
import tweepy

auth = tweepy.OAuthHandler(api_key, api_secret_key)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

@app.route('/', methods=['GET'])
def index():
  return 'Index'

@app.route('/search', methods=['POST'])
def search():
  values = request.json
  query, date, distance, hash_tags = [values[i] for i in ('query', 'date', 'distance', 'hashTags')]
  result = {
    'query': query,
    'date': date,
    'distance': distance,
    'hash_tags': hash_tags
  }
  
  return result

@app.route('/getTweets', methods=['GET'])
def getTweets():
  tweets = []
  public_tweets = api.home_timeline()
  for tweet in public_tweets:
      tweets.append(tweet._json)
    
  return { 'tweets': tweets }

if __name__ == '__main__':
  app.run(debug=True)
