import pandas as pd

df = pd.read_csv("created-datasets/full-joined.csv")

#Add rating column
df["rating"] = df.hours / df.main_story
df["rating"] = df["rating"].fillna(value=0.5)
df["rating"] = df.rating.apply(lambda x: min(1.0, x))
df["rating"] = df["rating"] * 10

#Rearrange columns
df = df.iloc[:, [0, 1, 13, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]

df.to_csv("full-joined-with-ratings.csv", index=False)

#Get just userid, game title, rating
df_utr = df.iloc[:, 0:3]
df_utr.to_csv("user-title-rating.csv", index=False)