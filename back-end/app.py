from flask import Flask, jsonify, request
import json
from steam_recommender import Steam_Recommender
import helper_functions

app = Flask(__name__)

@app.route("/")
def hello():
    return "Available URLS: /getRMSE, /getFriendsList?steam_id={steam_id}, /getGamesList?steam_id={steam_id}"

@app.route('/getRMSE', methods=['GET'])
def getRMSE():
    try:
        steam_recommender = Steam_Recommender("created-datasets/user-title-rating.csv", "SVD")
        rmse = steam_recommender.model_rmse()
        return json.dumps({"rmse": rmse}), 200, {"Content-Type": "application/json"}
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 400
    
steam_api_key = "46A0582A14B15A1C4B377ECC8639676B"

@app.route('/getFriendsList', methods=['GET'])
def getFriendsList():
    steam_id = request.args.get('steam_id') #Steam ID of the user whose friends you want to retrieve
    print("steam_id:", steam_id)
    try: 
        friends_list = helper_functions.getFriendsList(steam_id)
        return json.dumps({"friends": friends_list}), 200, {"Content-Type": "application/json"}
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 400
    
@app.route('/getGamesList', methods=['GET'])
def getGamesList():
    steam_id = request.args.get('steam_id') #Steam ID of the user whose friends you want to retrieve
    try:
        gamesList = helper_functions.getGamesList(steam_id)
        return json.dumps({"games": gamesList}), 200, {"Content-Type": "application/json"}
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run("localhost", 8888)