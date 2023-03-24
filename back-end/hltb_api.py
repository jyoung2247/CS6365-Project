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

def replace_zero(x):
    if x == 0:
        return np.nan
    else:
        return x

df = pd.read_csv("created-datasets/users-hltb.csv")
#Get rid of uid and hours
df = df.iloc[:, [1, 3]]
#Drop duplicate rows
df = df.drop_duplicates(subset='title')

#Read checkpoint
#df = pd.read_csv("users-hltb-checkpoint.csv")

#Get rid of 0s
df['main_story'] = df['main_story'].apply(lambda x: replace_zero(x))

#df to hold games which can't be found on hltb
df_missing_games = pd.DataFrame(columns=['title'])
df_missing_games = pd.read_csv("created-datasets/missing-hltb.csv")

#Read checkpoint
#df_missing_games = pd.read_csv("missing-hltb-checkpoint.csv")


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

# len_inds = len(nan_indices)
# for idx in nan_indices:
#     iteration += 1
#     game_name = df.iloc[idx, 0]
#     if game_name in titles_to_check:
#         main_story = get_main_story_hours(game_name)
#         if (not pd.isna(main_story)):
#             if main_story != 0:
#                 count_added += 1
#                 df.iloc[idx, 2] = main_story
#             else:
#                df_missing_games.loc[len(df_missing_games.index)] = game_name 
#         else:
#             df_missing_games.loc[len(df_missing_games.index)] = game_name
#     if (iteration % 1000 == 0):
#        print(iteration, len_inds)
#        df.to_csv("hltb-checkpoint.csv", index=False) 
#        df_missing_games.to_csv("missing-hltb-checkpoint.csv", index=False)

print("games added: ", count_added)
df.to_csv("created-datasets/hltb-new.csv", index=False)
df_missing_games.to_csv("created-datasets/missing-hltb.csv", index=False)