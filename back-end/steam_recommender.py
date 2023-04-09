from surprise import SVD, SVDpp, KNNWithMeans, KNNWithZScore, CoClustering, SlopeOne, Dataset, accuracy, Reader
from surprise.model_selection import train_test_split
from dataset_management import get_dataset_for_user
import pandas as pd
import numpy as np

class Steam_Recommender:

    def __init__(self, modelName, uid):
        self.uid = uid
        self.data = self.get_data()
        self.train = self.get_train()
        self.model = self.model_create_fit(modelName)

    #Import our csv as a dataframe to use as data
    def get_data(self):
        df = get_dataset_for_user(self.uid)
        reader = Reader(rating_scale=(0,10))
        data = Dataset.load_from_df(df, reader=reader)
        return data
    
    #This function is only necessary if we want to make rating estimates for every user in the dataset
    def get_train_test(self):
        train = self.data.build_full_trainset()
        test = train.build_anti_testset()
        return train, test
    
    #Return the trainingset for the model to be fit to
    def get_train(self):
        train = self.data.build_full_trainset()
        return train
    
    #Create and fit the model to the training data
    def model_create_fit(self, modelName):
        if modelName == "KNN_WM":
            model = KNNWithMeans()
        if modelName == "KNN_WZ":
            model = KNNWithZScore()
        if modelName == "SVDpp":
            model = SVDpp()
        if modelName == "CoClustering":
            model = CoClustering()
        if modelName == "SlopeOne":
            model = SlopeOne()
        if modelName == "SVD":
            model = SVD()
        else:
            model = SVD()
        model.fit(self.train)
        return model
    
    #RMSE of model
    def model_rmse(self):
        train, test = train_test_split(self.data, test_size=.20)
        self.model.fit(train)
        preds = self.model.test(test)
        return accuracy.rmse(preds)

    #Predict how user will like title
    def get_prediction(self, title):
        prediction = self.model.predict(self.uid, title)
        return prediction
    
    #Get top n titles and estimated ratings for a user
    def get_top_predictions(self):
        #Creating the test set for the user with uid = uid
        rating_mean = self.data.df["rating"].mean()
        user_df = self.data.df.loc[self.data.df['uid'] == self.uid]
        user_titles = user_df['title']
        all_titles = self.data.df['title'].unique()
        user_test = pd.DataFrame(np.setdiff1d(all_titles, user_titles), columns=['title'])
        user_test['uid'] = self.uid
        user_test['rating'] = rating_mean
        user_test = user_test.iloc[:, [1, 0, 2]]
        user_test = list(user_test.itertuples(index=False, name=None))

        #Getting the top n predictions for user
        predictions = self.model.test(user_test)
        df = pd.DataFrame(predictions)
        #Join predictions with game details
        df = df.rename(columns={'iid' : 'title'})
        df_details = pd.read_csv("created-datasets/game-details.csv")
        df = pd.merge(df, df_details, on="title", how="left")

        #Add hltb times
        df_hltb_original = pd.read_csv("created-datasets/hltb-original-clean.csv")

        #Add scraped hltb times to original
        df_hltb_added = pd.read_csv("created-datasets/hltb-new.csv")
        df_hltb_concat = pd.concat([df_hltb_added, df_hltb_original], axis=0)
        df_hltb_concat.drop_duplicates(subset='title', inplace=True)

        #Create lower case game name column for the purpose of joins
        df_hltb_concat["name_lower"] = df_hltb_concat['title'].str.lower()

        #Drop title column for joins
        df_hltb_concat.drop(columns=["title"], inplace=True)

        #Create lower case game name column for the purpose of joins
        df["name_lower"] = df['title'].str.lower()

        df = pd.merge(df, df_hltb_concat, on="name_lower", how="left")
        df_hltb_concat.drop(columns=["name_lower"], inplace=True)
        df.drop_duplicates(subset='title', inplace=True)
        df.loc[df['main_story'].isna(), 'main_story'] = "Unknown"

        df.sort_values(by="est", ascending=False, inplace=True)
        top_titles_ratings_details = df.iloc[:, [1, 3, 6, 7, 8, 9, 10, 12]].to_dict('records')
        #top_titles_ratings = list(zip(df.iloc[:n, [1]]['iid'], df.iloc[:n, [3]]['est']))

        return top_titles_ratings_details

# Example
# steam_recommender = Steam_Recommender("KNN_WM", 76561198058962258)
# top_titles_ratings = steam_recommender.get_top_predictions(100)
# print("top user titles: ", top_titles_ratings)
#rmse = steam_recommender.model_rmse()