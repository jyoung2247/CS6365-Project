from flask import Flask, jsonify, request
import json
from steam_recommender import SteamRecommender
import steam_api_functions
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app_json = "application/json"
err = "Error: "

@app.route("/")
def hello():
    return "Available URLS: /getRecs?steam_id={steam_id}?model_type={model_type}, /getRMSE, /getFriendsList?steam_id={steam_id}, /getGamesList?steam_id={steam_id}"

@app.route('/getRecs', methods=['GET'])
def get_recs():
    try:
        steam_id = request.args.get('steam_id')
        model_type = request.args.get('model_type')
        steam_recommender = SteamRecommender(model_type, steam_id)
        top_titles_ratings_details = steam_recommender.get_top_predictions()
        return json.dumps(top_titles_ratings_details), 200, {"Content-Type": app_json}
    except Exception as e:
        print(err, e)
        return jsonify({"error": str(e)}), 400

@app.route('/getRMSE', methods=['GET'])
def get_rmse():
    try:
        steam_id = request.args.get('steam_id')
        steam_recommender = SteamRecommender("SVD", steam_id)
        rmse = steam_recommender.model_rmse()
        return json.dumps({"rmse": rmse}), 200, {"Content-Type": app_json}
    except Exception as e:
        print(err, e)
        return jsonify({"error": str(e)}), 400

    
steam_api_key = "46A0582A14B15A1C4B377ECC8639676B"

@app.route('/getFriendsList', methods=['GET'])
def get_friends_list():
    steam_id = request.args.get('steam_id') #Steam ID of the user whose friends you want to retrieve
    print("steam_id:", steam_id)
    try: 
        friends_list = steam_api_functions.get_friends_list(steam_id)
        return json.dumps({"friends": friends_list}), 200, {"Content-Type": app_json}
    except Exception as e:
        print(err, e)
        return jsonify({"error": str(e)}), 400
    
@app.route('/getGamesList', methods=['GET'])
def get_games_list():
    steam_id = request.args.get('steam_id') #Steam ID of the user whose friends you want to retrieve
    try:
        games_list = steam_api_functions.get_games_list(steam_id)
        return json.dumps({"games": games_list}), 200, {"Content-Type": app_json}
    except Exception as e:
        print(err, e)
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run("localhost", 8888)