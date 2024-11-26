# recommendation_engine.py

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from fuzzywuzzy import process

class RecommendationEngine:
    def __init__(self):
        self.akas = None
        self.ratings = None
        self.merged_data = None
        self.tfidf = None
        self.tfidf_matrix = None
        self.load_data()
        self.prepare_data()

    def load_data(self):
        self.akas = pd.read_csv(
            'data/title.akas.tsv', 
            sep='\t',
            na_values='\\N',
            low_memory=False,
            nrows=100000
        )
        self.ratings = pd.read_csv(
            'data/title.ratings.tsv', 
            sep='\t',
            na_values='\\N',
            low_memory=False,
            nrows=100000
        )
        
        self.akas = self.akas[self.akas['region'] == 'BR']

        required_columns_akas = ['title', 'region', 'types']
        self.akas = self.akas.dropna(subset=required_columns_akas)
        print(self.akas.head())
        self.ratings = self.ratings.dropna(subset=['averageRating', 'numVotes'])

        self.merged_data = pd.merge(self.akas, self.ratings, left_on='titleId', right_on='tconst')

        if self.merged_data.empty:
            raise ValueError("Dados mesclados estão vazios. Verifique se as colunas correspondem e se os dados estão corretos.")

    def prepare_data(self):
        self.merged_data['features'] = (
            self.merged_data['types'].astype(str).str.lower() + ' ' +
            self.merged_data['attributes'].astype(str).str.lower() + ' ' +
            self.merged_data['region'].astype(str).str.lower() + ' ' +
            self.merged_data['language'].astype(str).str.lower()
        )
        self.merged_data['combined_features'] = (
            self.merged_data['title'].astype(str).str.lower() + ' ' +
            self.merged_data['features']
        )

        self.tfidf = TfidfVectorizer(stop_words='english')
        self.tfidf_matrix = self.tfidf.fit_transform(self.merged_data['combined_features'])

    def get_recommendations(self, title="", top_n=10, min_rating=0, min_votes=0):
        query = title.lower()

        query_vec = self.tfidf.transform([query])

        cosine_similarities = linear_kernel(query_vec, self.tfidf_matrix).flatten()

        sim_scores = list(enumerate(cosine_similarities))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        sim_scores = sim_scores[1:]
        
        filtered_indices = []
        for i, score in sim_scores:
            avg_rating = self.merged_data.iloc[i]['averageRating']
            num_votes = self.merged_data.iloc[i]['numVotes']
            if avg_rating >= min_rating and num_votes >= min_votes:
                filtered_indices.append(i)
                if len(filtered_indices) >= top_n:
                    break

        return self.merged_data['title'].iloc[filtered_indices].tolist()
