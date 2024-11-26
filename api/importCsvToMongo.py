import pandas as pd
import json
from pymongo import MongoClient

def mongoimport(tsv_path, coll_name):
    """Imports a TSV file to a MongoDB collection.
    Returns: count of the documents in the new collection.
    """
    mongo_uri = "mongodb+srv://admin:I9qgUqjE3EuvWYn1@movies-cluster.aeyjp.mongodb.net/?retryWrites=true&w=majority&appName=movies-cluster"
    client = MongoClient(mongo_uri)
    db = client["data"]
    
    coll = db[coll_name]
    
    # Lê o arquivo TSV
    data = pd.read_csv(tsv_path, sep='\t')
    
    # Converte para JSON
    payload = json.loads(data.to_json(orient='records'))
    
    # Remove documentos antigos e insere novos
    coll.delete_many({})
    coll.insert_many(payload)
    
    return coll.count_documents({})

if __name__ == "__main__":
    tsv_path = './dataset/title.akas.tsv'  # Substitua pelo caminho real do arquivo
    collection_name = 'titles'
    print(f"Number of documents in {collection_name}: {mongoimport(tsv_path, collection_name)}")
