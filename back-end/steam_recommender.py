from surprise import SVD, Dataset, accuracy, Reader
from surprise.model_selection import train_test_split
import pandas as pd
import numpy as np

class Steam_Recommender:

    def __init__(self, csv_filepath, modelName):
        self.data = self.get_data(csv_filepath)
        self.train = self.get_train()
        self.model = self.fit_svd(modelName)

    #Import our csv as a dataframe to use as data
    def get_data(self, filepath):
        df = pd.read_csv(filepath)
        reader = Reader(rating_scale=(0,10))
        data = Dataset.load_from_df(df, reader=reader)
        return data

    def get_train_test(self):
        train = self.data.build_full_trainset()
        test = train.build_anti_testset()
        return train, test

    def get_train(self):
        train = self.data.build_full_trainset()
        return train

    def fit_svd(self, modelName):
        if modelName == "SVD":
            model = SVD()
        else:
            model = SVD()
        model.fit(self.train)
        return model
        
    def model_rmse(self):
        train, test = train_test_split(self.data, test_size=.20)
        self.model.fit(train)
        preds = self.model.test(test)
        return accuracy.rmse(preds)

    #Predict how user will like title
    def get_prediction(self, uid, title):
        prediction = self.model.predict(uid, title)
        return prediction

    def get_top_predictions(self, uid, n):
        #Creating the test set for the user with uid = uid
        rating_mean = self.data.df["rating"].mean()
        user_df = self.data.df.loc[self.data.df['uid'] == uid]
        user_titles = user_df['title']
        all_titles = self.data.df['title']
        user_test = pd.DataFrame(np.setdiff1d(all_titles, user_titles), columns=['title'])
        user_test['uid'] = uid
        user_test['rating'] = rating_mean
        user_test = user_test.iloc[:, [1, 0, 2]]
        user_test = list(user_test.itertuples(index=False, name=None))

        #Getting the top n predictions for user
        predictions = self.model.test(user_test)
        df = pd.DataFrame(predictions)
        df.sort_values(by="est", ascending=False, inplace=True)
        if n > df.shape[0]:
            n = df.shape[0]
        top_user_titles = df.iloc[:n, [1]]['iid'].values.tolist()
        top_user_ratings = df.iloc[:n, [3]]['est'].values.tolist()
        return top_user_titles, top_user_ratings

#Example
steam_recommender = Steam_Recommender("back-end/user-title-rating.csv", "SVD")
top_user_titles, top_user_ratings = steam_recommender.get_top_predictions(59945701, 10)
rmse = steam_recommender.model_rmse()