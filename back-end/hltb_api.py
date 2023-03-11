from howlongtobeatpy import HowLongToBeat
import pandas as pd
import numpy as np

def get_main_story_hours(gameName):
    results_list = HowLongToBeat().search(str(gameName))
    if results_list is not None and len(results_list) > 0:
        best_element = max(results_list, key=lambda element: element.similarity)
        return best_element.main_story
    else:
        return np.nan
# result = asyncio.run(getresults("Arma 3")) 

# print(result.main_story)




# #Clean games
# df_games = pd.read_csv("original-datasets/games.csv")
# df_games = df_games.loc[:, ["name", "all_reviews", "release_date", "developer", "publisher", "game_details", "genre"]]
# #Create lower case game name column for the purpose of joins
# df_games["name_lower"] = df_games.name.str.lower()

# #Clean HLTB
# df_hltb = pd.read_csv("original-datasets/HLTB.csv")
# df_hltb = df_hltb.loc[:, ["title", "main_story"]]
# #Strip non-digits from main_story
# df_hltb["main_story"] = df_hltb["main_story"].str.replace('\D', '', regex=True).astype("float64")
# #Create lower case game name column for the purpose of joins
# df_hltb["name_lower"] = df_hltb.title.str.lower()
# #Delete previous title column for purpose of joins
# df_hltb.drop(columns="title", inplace=True)

# #Joining data
# df_games_hltb = pd.merge(df_games, df_hltb, on="name_lower", how="left")
# main_story = df_games_hltb["main_story"].to_numpy()
# main_nan = pd.isna(df_games_hltb["main_story"]).to_numpy()
# nan_indices = np.argwhere(main_nan).squeeze()
# #df_games_hltb.to_csv("Games-HLTB.csv", index=False)

df = pd.read_csv("back-end/full-joined.csv")
#Get rid of uid
df = df.iloc[:, 1:]
#Drop duplicate rows
df = df.drop_duplicates(subset='title')


main_story = df["main_story"].to_numpy()
main_nan = pd.isna(df["main_story"]).to_numpy()
nan_indices = np.argwhere(main_nan).squeeze()

count_added = 0
iteration = 0
len_inds = len(nan_indices)
for idx in nan_indices:
    print(iteration, len_inds)
    iteration += 1
    game_name = df.iloc[idx, 0]
    main_story = get_main_story_hours(game_name)
    if (not pd.isna(main_story)):
        print(game_name)
        count_added += 1
        df.iloc[idx, 12] = main_story
print(count_added)
df.to_csv("full-joined-updated.csv", index=False)

#df_games['main_story'] = np.nan

# game_names = df_games['name'].tolist()
# for idx, game_name in enumerate(game_names):
#     print(idx, game_name)
#     main_story = get_main_story_hours(game_name)
#     df_games.iloc[idx, 7] = main_story
# df_games.to_csv("Games-HLTB.csv", index=False)