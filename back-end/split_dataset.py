import pandas as pd

df = pd.read_csv("created-datasets/users-hltb.csv")

df1 = df.iloc[0:int(len(df.index)/2)]

df2 = df.iloc[int(len(df.index)/2):]

df1.to_csv("created-datasets/users-hltb-part1.csv")

df2.to_csv("created-datasets/users-hltb-part2.csv")