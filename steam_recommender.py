from surprise import SVD, Dataset, accuracy, Reader
from surprise.model_selection import train_test_split
import pandas as pd

#Import our csv as a dataframe to use as data
df = pd.read_csv("user-title-rating.csv")
reader = Reader(rating_scale=(0,10))
data = Dataset.load_from_df(df, reader=reader)

#Create train test split
train, test = train_test_split(data, test_size=.20)

#Choose model, fit, and predict
model = SVD()
model.fit(train)
preds = model.test(test)

#Print accuracy
print(accuracy.rmse(preds))