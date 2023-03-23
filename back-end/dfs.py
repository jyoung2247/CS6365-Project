from helper_functions import getFriendsList, getGamesList
import pandas as pd

# d = {'uid': [0], 'title': ['placeholder'], 'hours': [0.0]}
# df = pd.DataFrame(data = d)

df = pd.DataFrame(columns=['uid', 'title', 'hours'])
depth = 0
df_visited_users = pd.DataFrame(columns=['uid'])

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
        if (depth >= max_depth):
            return
        if friend not in df_visited_users['uid']:
            depth += 1
            dfs(int(friend), max_depth)

dfs(76561198058962258, 500)
df.to_csv("added-users.csv", index=False)
df_visited_users.to_csv("visited-users.csv", index=False)