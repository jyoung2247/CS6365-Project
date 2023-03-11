import pandas as pd
import numpy as np

def replace_zero(x):
    if x == 0:
        return np.nan
    else:
        return x
    
df_hltb_updated = pd.read_csv("full-joined-updated.csv")
df_hltb_updated['main_story'] = df_hltb_updated['main_story'].apply(lambda x: replace_zero(x))
#df_hltb.to_csv("full-joined-updated-no-zeros.csv", index=False)
#Create lower case game name column for the purpose of joins
df_hltb_updated["name_lower"] = df_hltb_updated.title.str.lower()

#Clean games
df_games = pd.read_csv("original datasets/games.csv")
df_games = df_games.loc[:, ["name", "all_reviews", "release_date", "developer", "publisher", "game_details", "genre"]]
#Create lower case game name column for the purpose of joins
df_games["name_lower"] = df_games.name.str.lower()

#Clean HLTB
df_hltb = pd.read_csv("original datasets/HLTB.csv")
df_hltb = df_hltb.loc[:, ["title", "main_story"]]
#Strip non-digits from main_story
df_hltb["main_story"] = df_hltb["main_story"].str.replace('h', '', regex=True).astype("float64")
#Create lower case game name column for the purpose of joins
df_hltb["name_lower"] = df_hltb.title.str.lower()
#Delete previous title column for purpose of joins
df_hltb.drop(columns="title", inplace=True)

#Joining data
df_combined = pd.merge(df_hltb, df_hltb_updated, on="name_lower", how="left")

#Combine hltb-values
hltb_original = df_combined['main_story_x'].to_numpy()
hltb_added = df_combined['main_story_y'].to_numpy()

hltb_combined = np.where(pd.isna(hltb_original), hltb_added, hltb_original)
df_joined_updated = pd.DataFrame()
df_joined_updated['name_lower'] = df_combined.iloc[:, 1]
df_joined_updated['main_story'] = hltb_combined
df_joined_updated = df_joined_updated.iloc[2:, :]

#df_hltb['main_story'] = hltb_combined[2:]

#df_hltb = df_hltb.iloc[:, [1,0]]

df_joined_updated.to_csv("HLTB-updated.csv", index=False)


