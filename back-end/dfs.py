from helper_functions import getFriendsList, getGamesList
import pandas as pd

#df = pd.DataFrame(columns=['uid', 'title', 'hours'])
depth = 0
#df_visited_users = pd.DataFrame(columns=['uid'])

df = pd.read_csv("created-datasets/added-users.csv")
df_visited_users = pd.read_csv("created-datasets/visited-users.csv")

def dfs(uid, max_depth):
    global depth
    if (depth >= max_depth):
        return
    df_visited_users.loc[len(df_visited_users.index)] = uid
    print(depth)
    games = getGamesList(uid)
    if (games == 0):
        depth-=1
        return
    for game in games:
        df.loc[len(df.index)] = [uid, game['name'], game['playtime_forever']/60.0]
    friends = getFriendsList(uid)
    if (friends == 0):
        return
    friends = friends.split(",")
    for friend in friends:
        friend = int(friend)
        if (depth >= max_depth):
            return
        if friend not in df_visited_users['uid'].values:
            depth += 1
            dfs(friend, max_depth)

uid = 76561198044591301
if uid not in df_visited_users['uid'].values:
    dfs(uid, 500)
df.to_csv("created-datasets/added-users.csv", index=False)
df_visited_users.to_csv("created-datasets/visited-users.csv", index=False)