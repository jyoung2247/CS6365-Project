import requests
import json

steam_api_key = "46A0582A14B15A1C4B377ECC8639676B"

def getFriendsList(steam_id):
    # Make a request to the Steam Web API to retrieve the friend list
    url = f"https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key={steam_api_key}&steamid={steam_id}"
    data = requests.get(url).json()
    friends_list = [friend["steamid"] for friend in data["friendslist"]["friends"]]
    # convert each element from str to int
    friends_list_int = [int(elem) for elem in friends_list]
    # [123, 321, 213] -> "123,321,213"
    friends_list_stringified = ','.join(str(elem) for elem in friends_list_int)
    print(str(friends_list_stringified))
    return friends_list_stringified

def getGamesList(steam_id):
    # Replace with your own Steam Web API key
    steam_api_key = "46A0582A14B15A1C4B377ECC8639676B"

    # Make a request to the Steam Web API to retrieve the list of games
    url = f"https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key={steam_api_key}&steamid={steam_id}&include_played_free_games=1&include_appinfo=1"
    data = requests.get(url).json()
    if (len(data["response"])) == 0:
        print("user owns no games, or is private")
        return 0
    # Extract the list of games from the response
    gamesList = (data["response"]["games"])
    return gamesList