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

df = pd.read_csv("created-datasets/full-joined.csv")
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
        df.iloc[idx, 2] = main_story
print(count_added)
df.to_csv("full-joined-updated-3.csv", index=False)