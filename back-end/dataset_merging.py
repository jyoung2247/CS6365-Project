import pandas as pd
from helper_functions import getGamesList

def merge_datasets(uid):
    #Clean games
    # df_games = pd.read_csv("original-datasets/games.csv")
    # df_games = df_games.loc[:, ["name", "all_reviews", "release_date", "developer", "publisher", "game_details", "genre"]]
    # #Create lower case game name column for the purpose of joins
    # df_games["name_lower"] = df_games.name.str.lower()

    # #Clean HLTB - only used before updated HLTB created
    # df_hltb = pd.read_csv("original-datasets/hltb-original.csv")
    # df_hltb = df_hltb.loc[:, ["title", "main_story"]]
    # #Strip h from main_story
    # df_hltb["main_story"] = df_hltb["main_story"].str.replace('h', '', regex=True).astype("float64")
    # #Create lower case game name column for the purpose of joins
    # df_hltb["name_lower"] = df_hltb.title.str.lower()
    # #Delete previous title column for purpose of joins
    # df_hltb.drop(columns="title", inplace=True)

    #Use updated HLTB
    df_hltb = pd.read_csv("created-datasets/hltb-combined.csv")

    #Clean metacritic
    # df_metacritic = pd.read_csv("original-datasets/metacritic.csv")
    # df_metacritic = df_metacritic[df_metacritic.platform == "PC"]
    # df_metacritic = df_metacritic.loc[:, ["name", "score", "user score", "players"]]
    # #Create lower case game name column for the purpose of joins
    # df_metacritic["name_lower"] = df_metacritic.name.str.lower()
    # #Delete previous name column for purpose of joins
    # df_metacritic.drop(columns="name", inplace=True)

    #Clean users
    df_users = pd.read_csv("original-datasets/users.csv")
    df_users = df_users[df_users.behavior == "play"]
    df_users = df_users.loc[:, ["uid", "title", "hours"]]

    #Add scraped users to original dataset
    df_added_users = pd.read_csv("created-datasets/added-users.csv")
    df_users_concat = pd.concat([df_users, df_added_users], axis=0)

    #Add new user to dataset
    if uid != None:
        games = getGamesList(uid)
        if games == 0:
            print("Error, profile is private or has no games")
        user_df = df_users_concat.loc[df_users_concat['uid'] == uid]
        if user_df.empty:
            for game in games:
                df_users_concat.loc[len(df_users_concat.index)] = [uid, game['name'], game['playtime_forever']/60.0]
        else:
            for game in games:
                test_df = user_df.loc[user_df['title'] == game['name']]
                if test_df.empty:
                    df_users_concat.loc[len(df_users_concat.index)] = [uid, game['name'], game['playtime_forever']/60.0]
                else:
                    df_users_concat.loc[(df_users_concat['uid'] == uid) & (df_users_concat['title'] == game['name'])] = [uid, game['name'], game['playtime_forever']/60.0]
    
    #Create lower case game name column for the purpose of joins
    df_users_concat["name_lower"] = df_users_concat['title'].str.lower()

    #Joining data
    #df_games_metacritic = pd.merge(df_games, df_metacritic, on="name_lower", how="left")
    #df_hltb_games_metacritic = pd.merge(df_hltb, df_games_metacritic, on="name_lower", how="left")
    df_users_hltb = pd.merge(df_users_concat, df_hltb, on="name_lower", how="left")

    #Drop name lower and name columns since all we need is title column now
    #df_users_hltb_games_metacritic.drop(columns=["name_lower", "name"], inplace=True)

    #Drop name lower
    df_users_hltb.drop(columns=["name_lower"], inplace=True)

    return df_users_hltb

def add_ratings(df):
    #Add rating column
    df["rating"] = df.hours / df.main_story
    df["rating"] = df["rating"].fillna(value=df['hours'] / df['main_story'].mean())
    df["rating"] = df.rating.apply(lambda x: min(2.0, x))
    df["rating"] = df["rating"] * 5

    #Rearrange columns
    #df = df.iloc[:, [0, 1, 13, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]
    df = df.iloc[:, [0, 1, 4, 2, 3]]

    # mean_rating = df["rating"].mean()
    # print("mean rating: ", mean_rating)


    #Get just userid, game title, rating
    df_utr = df.iloc[:, 0:3]
    
    return df, df_utr

## Create datasets

df_users_hltb = merge_datasets(None)
#Export joined data to csv
df_users_hltb.to_csv("created-datasets/users-hltb.csv", index=False)

df, df_utr = add_ratings(df_users_hltb)
#Write to CSVs
df.to_csv("created-datasets/users-hltb-ratings.csv", index=False)
df_utr.to_csv("created-datasets/user-title-rating.csv", index=False)
