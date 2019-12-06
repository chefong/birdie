# Birdie
Birdie is a web application that scrapes, indexes, and visualizes tweets from Twitter on a map.

## Running the App
The application is comprised of both the frontend and the backend. First, clone this repository.

### Frontend
The frontend is developed using React. To start the frontend, make sure you have `node` installed and navigate to the `frontend` directory where the `package.json` file is located. Then, run
```
npm install
```
Once all the Node packages are done installing, you can start the React app by doing
```
npm start
```
This should spin up the application on `localhost:3000`.

### Backend
The backend is developed using Flask. To start the backend, make sure `python3` is installed, then navigate to the `backend` directory where the `requirements.txt` file is located. Create and activate a Python virtual environment. Then, install the necessary libraries by doing
```
pip3 install -r requirements.txt
```
Once all the libraries are done installing, you may run the backend by doing
```
python3 app.py
```

#### Additional Backend Files
* `backend/tweets.py` (streams tweets)
* `es.py` (inserts into elasticsearch)

## Project Proposal

### Scraping Tweets
For our project, we will develop an application that can handle streaming tweets from Twitter. We plan on using python and urllib3 to scrape the titles for each tweet. We may look into other alternatives such as beautiful soup and Scrapy and use the one with the best performance. The work will be distributed with 1 person looking into how to parse the tweets, 1 person streaming the tweets, and 1 person setting up the scraper for obtaining the information needed. Most of the work will be put into setting up the scraper properly, so when the other two finish their tasks, they can help with implementing the scraper. Because we are streaming a tweet, there won’t be any initial pages that we will crawl, but if a URL is found then we will scrape that page (We do not know beforehand we kind of page we are crawling as it will depend on the tweet).

### Indexing Tweets
In terms of building an index/retrieval system, we will be using Elastic Search and Lucene. Since we’ll be collecting Tweets, ElasticSearch will be extremely helpful for quickly retrieving tweets, since it provides efficient indexing. We’ll be streaming tweets, storing all the tweets in Lucene, since ElasticSearch is built on top of it. Thus, our backend, which will be written in Flask, will connect to ElasticSearch/Lucene, then feed this data into the frontend.

### Web Application
We will make the scraper into a fully functional web app using React and Flask. The frontend will provide an interface for users to be able to search and view a list of results sorted in terms of ranking. The frontend will have similar functionalities to other search engines such as Yahoo and Google where there will be an input and search button. The search button will hit an endpoint in the backend and Flask will return a list of results for the frontend to display. We may include other metadata about the results depending on the time constraint.

## Contributors
* Eric Ong
* John Shin
* Erin Wong