import pandas as pd
from steam_api_functions import getFriendsList, getGamesList
from howlongtobeatpy import HowLongToBeat
import numpy as np

#Needed for initial run before added-users and visitied-users created
#df_added_users = pd.DataFrame(columns=['uid', 'title', 'hours'])
#df_visited_users = pd.DataFrame(columns=['uid'])

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
        df_added_users.loc[len(df_added_users.index)] = [uid, game['name'], game['playtime_forever']/60.0]
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

def merge_datasets(uid):

    # #Clean HLTB - only used before updated HLTB created
    # df = pd.read_csv("original-datasets/hltb-original.csv")
    # df = df[~df['main_story'].isna()]
    # df = df.drop_duplicates(subset='title')
    # df = df.iloc[:, [1, 2]]
    # #Strip h from main_story
    # df["main_story"] = df["main_story"].str.replace('h', '', regex=True).astype("float64")
    # df.to_csv("created-datasets/hltb-original-clean.csv", index=False)

    #Use cleaned hltb
    df_hltb_original = pd.read_csv("created-datasets/hltb-original-clean.csv")

    #Add scraped hltb times to original
    df_hltb_added = pd.read_csv("created-datasets/hltb-new.csv")
    df_hltb_concat = pd.concat([df_hltb_added, df_hltb_original], axis=0)
    df_hltb_concat.drop_duplicates(subset='title')

    #Create lower case game name column for the purpose of joins
    df_hltb_concat["name_lower"] = df_hltb_concat['title'].str.lower()

    #Drop title column for joins
    df_hltb_concat.drop(columns=["title"], inplace=True)

    # #Clean users
    # df_users = pd.read_csv("original-datasets/users.csv")
    # df_users = df_users[df_users.behavior == "play"]
    # df_users = df_users.loc[:, ["uid", "title", "hours"]]

    #Add scraped users to original dataset
    df_users = pd.read_csv("created-datasets/added-users.csv")
    #df_users_concat = pd.concat([df_users, df_added_users], axis=0)

    #Add new user to dataset
    if uid != None:
        games = getGamesList(uid)
        if games == 0:
            print("Error, profile is private or has no games")
        user_df = df_users.loc[df_users['uid'] == uid]
        if user_df.empty:
            for game in games:
                df_users.loc[len(df_users.index)] = [uid, game['name'], game['playtime_forever']/60.0]
        else:
            for game in games:
                test_df = user_df.loc[user_df['title'] == game['name']]
                if test_df.empty:
                    df_users.loc[len(df_users.index)] = [uid, game['name'], game['playtime_forever']/60.0]
                else:
                    df_users.loc[(df_users['uid'] == uid) & (df_users['title'] == game['name'])] = [uid, game['name'], game['playtime_forever']/60.0]
    
    #Create lower case game name column for the purpose of joins
    df_users["name_lower"] = df_users['title'].str.lower()

    #Joining data
    df_users_hltb = pd.merge(df_users, df_hltb_concat, on="name_lower", how="left")

    #Drop name lower since all we need is title column now
    df_users_hltb.drop(columns=["name_lower"], inplace=True)

    return df_users_hltb

def add_ratings(df):
    #Add rating column
    df["rating"] = df.hours / df.main_story
    df["rating"] = df["rating"].fillna(value=df['hours'] / df['main_story'].median())
    df["rating"] = df.rating.apply(lambda x: min(2.0, x))
    df["rating"] = df["rating"] * 5

    #Rearrange columns
    df = df.iloc[:, [0, 1, 4, 2, 3]]

    #Get just userid, game title, rating
    df_utr = df.iloc[:, 0:3]
    
    return df, df_utr

def get_main_story_hours(gameName):
    results_list = HowLongToBeat().search(str(gameName))
    if results_list is not None and len(results_list) > 0:
        best_element = max(results_list, key=lambda element: element.similarity)
        return best_element.main_story
    else:
        return np.nan

# def replace_zero(x):
#     if x == 0:
#         return np.nan
#     else:
#         return x
    
def update_hltb():
    df = pd.read_csv("created-datasets/users-hltb.csv")
    #Get rid of uid and hours
    df = df.iloc[:, [1, 3]]
    #Drop duplicate rows
    df = df.drop_duplicates(subset='title')

    #Get rid of 0s
    #df['main_story'] = df['main_story'].apply(lambda x: replace_zero(x))

    #df to hold games which can't be found on hltb
    df_missing_games = pd.DataFrame(columns=['title'])
    df_missing_games = pd.read_csv("created-datasets/missing-hltb.csv")

    main_story = df["main_story"].to_numpy()
    main_nan = pd.isna(df["main_story"]).to_numpy()
    nan_indices = np.argwhere(main_nan).squeeze()

    unavailable_titles = df_missing_games['title']

    missing_titles = df['title'].iloc[nan_indices]

    titles_to_check = set(np.setdiff1d(missing_titles, unavailable_titles))

    count_added = 0
    iteration = 0
    total_titles_to_check = len(titles_to_check)

    for game_name in titles_to_check:
        print(iteration, total_titles_to_check)
        iteration+=1
        main_story = get_main_story_hours(game_name)
        if (not pd.isna(main_story)):
            if main_story != 0:
                count_added += 1
                print(game_name)
                df.loc[df['title'] == game_name] = main_story
            else:
                df_missing_games.loc[len(df_missing_games.index)] = game_name
        else:
            df_missing_games.loc[len(df_missing_games.index)] = game_name
    print(count_added)

    print("games added: ", count_added)
    df.to_csv("created-datasets/hltb-new.csv", index=False)
    df_missing_games.to_csv("created-datasets/missing-hltb.csv", index=False)

def update_datasets(uid, max_depth):
    #Run DFS to add to dataset
    if uid not in df_visited_users['uid'].values:
        dfs(uid, max_depth)
    else:
        print("User has already been visited. Please choose a new user to start DFS on")
        return
    df_added_users.to_csv("created-datasets/added-users.csv", index=False)
    df_visited_users.to_csv("created-datasets/visited-users.csv", index=False)

    ## Create datasets
    df_users_hltb = merge_datasets(None)
    df, df_utr = add_ratings(df_users_hltb)

    #Write to csvs
    df_users_hltb.to_csv("created-datasets/users-hltb.csv", index=False)
    df.to_csv("created-datasets/users-hltb-ratings.csv", index=False)
    df_utr.to_csv("created-datasets/user-title-rating.csv", index=False)

    #Find hltb values for newly added titles
    update_hltb()

    #Run dataset merging and add ratings again with updated hltb values
    df_users_hltb = merge_datasets(None)
    df, df_utr = add_ratings(df_users_hltb)

    #Write to csvs
    df_users_hltb.to_csv("created-datasets/users-hltb.csv", index=False)
    df.to_csv("created-datasets/users-hltb-ratings.csv", index=False)
    df_utr.to_csv("created-datasets/user-title-rating.csv", index=False)

depth = 0
df_added_users = pd.read_csv("created-datasets/added-users.csv")
df_visited_users = pd.read_csv("created-datasets/visited-users.csv")

# #Uncomment to update dataset, otherwise keep commented so it doesn't run updates when imported by steam_recommender.py
#update_datasets(76561197972651946, 500)

