import pandas as pd

#Clean games
df_games = pd.read_csv("original-datasets/games.csv")
df_games = df_games.loc[:, ["name", "all_reviews", "release_date", "developer", "publisher", "game_details", "genre"]]
#Create lower case game name column for the purpose of joins
df_games["name_lower"] = df_games.name.str.lower()


# #Clean HLTB
# df_hltb = pd.read_csv("original-datasets/HLTB.csv")
# df_hltb = df_hltb.loc[:, ["title", "main_story"]]
# #Strip h from main_story
# df_hltb["main_story"] = df_hltb["main_story"].str.replace('h', '', regex=True).astype("float64")
# #Create lower case game name column for the purpose of joins
# df_hltb["name_lower"] = df_hltb.title.str.lower()
# #Delete previous title column for purpose of joins
# df_hltb.drop(columns="title", inplace=True)

#Use updated HLTB
df_hltb = pd.read_csv("created-datasets/HLTB-updated.csv")

#Clean metacritic
df_metacritic = pd.read_csv("original-datasets/metacritic.csv")
df_metacritic = df_metacritic[df_metacritic.platform == "PC"]
df_metacritic = df_metacritic.loc[:, ["name", "score", "user score", "players"]]
#Create lower case game name column for the purpose of joins
df_metacritic["name_lower"] = df_metacritic.name.str.lower()
#Delete previous name column for purpose of joins
df_metacritic.drop(columns="name", inplace=True)

#Clean users
df_users = pd.read_csv("original-datasets/users.csv")
df_users = df_users[df_users.behavior == "play"]
df_users = df_users.loc[:, ["uid", "title", "hours"]]
#Create lower case game name column for the purpose of joins
df_users["name_lower"] = df_users.title.str.lower()
#Delete previous title column for purpose of joins
#df_users.drop(columns="title", inplace=True)

#Add scraped users to original dataset
df_added_users = pd.read_csv("created-datasets/added-users.csv")
df_added_users["name_lower"] = df_added_users.title.str.lower()

df_users_concat = pd.concat([df_users, df_added_users], axis=0)

#Joining data
df_games_metacritic = pd.merge(df_games, df_metacritic, on="name_lower", how="left")
df_hltb_games_metacritic = pd.merge(df_hltb, df_games_metacritic, on="name_lower", how="left")
df_users_hltb_games_metacritic = pd.merge(df_users_concat, df_hltb_games_metacritic, on="name_lower", how="left")

#Drop rows where name is NaN, meaning no link between users and games
#df_users_games_metacritic_hltb.dropna(subset="name", inplace=True)

#Drop name lower and name columns since all we need is title column now
df_users_hltb_games_metacritic.drop(columns=["name_lower", "name"], inplace=True)


#Add rating column
#df_users_games_metacritic_hltb["rating"] = df_users_games_metacritic_hltb.hours / df_users_games_metacritic_hltb.main_story
#df_users_games_metacritic_hltb["rating"] = df_users_games_metacritic_hltb["rating"].fillna(value=0.5)
#df_users_games_metacritic_hltb["rating"] = df_users_games_metacritic_hltb.rating.apply(lambda x: min(1.0, x))
#df_users_games_metacritic_hltb["rating"] = df_users_games_metacritic_hltb["rating"] * 10

#Rearrange columns
#df_users_games_metacritic_hltb = df_users_hltb_games_metacritic.iloc[:, [0, 1, 2, 12, 3, 4, 5, 6, 7, 8, 9, 10, 11]]

#Rename name to title for clarity
#df_users_games_metacritic_hltb.rename(columns={'name' : 'title'}, inplace=True)

#Export joined data to csv
df_users_hltb_games_metacritic.to_csv("full-joined.csv", index=False)

#Get just userid, game title, rating
#df_utr = df_users_games_metacritic_hltb.iloc[:, 0:3]

#Export to csv
#df_utr.to_csv("user-title-rating-TEST.csv", index=False)

