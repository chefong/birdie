from birdie import app
from flask import jsonify, json, request
from elasticsearch import Elasticsearch


@app.route("/search", methods=["POST"])
def query():
    es = Elasticsearch("http://localhost:9200")

    if request.get_json():
        data = request.get_json()
        input = data["input"]

        query = {
          "query": {
            "bool" : {
              "must" : {
                "term" : { "content": input }
              }
            }
          }
        }

        res = es.search(index="testingtwo", body=query)
        return jsonify(res['hits']['hits'])
    else:
        return "no input provided"
    return "no input provided"
