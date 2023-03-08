from surprise import SVD, Dataset, accuracy, Reader
from surprise.model_selection import train_test_split
import pandas as pd

#Import our csv as a dataframe to use as data
def load_csv(filepath):
    df = pd.read_csv(filepath)
    reader = Reader(rating_scale=(0,10))
    data = Dataset.load_from_df(df, reader=reader)
    return data

def fit_svd(train):
    model = SVD()
    model.fit(train)
    return model
    
def model_rmse(model, test):
    preds = model.test(test)
    return accuracy.rmse(preds)

#Predict how user will like title
def get_prediction(uid, title):
    prediction = model.predict(uid, title)
    return prediction

data = load_csv("user-title-rating.csv")
#Create train test split
train, test = train_test_split(data, test_size=.20)
model = fit_svd(train)
rmse = model_rmse(model, test)
prediction = get_prediction(59945701, "Dota 2")
print(prediction)
