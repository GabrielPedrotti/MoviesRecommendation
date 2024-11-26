# app.py

from flask import Flask, request, jsonify
from recommendation_engine import RecommendationEngine

app = Flask(__name__)

# Inicializa o motor de recomendação
engine = RecommendationEngine()

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Bem-vindo à API de Recomendações'})

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    """
    Endpoint para obter recomendações de títulos.

    Parâmetros:
    - title (str): Título para o qual deseja obter recomendações.
    - top_n (int, opcional): Número de recomendações a serem retornadas (padrão é 10).
    - min_rating (float, opcional): Rating médio mínimo (padrão é 0).
    - min_votes (int, opcional): Número mínimo de votos (padrão é 0).
    """
    title = request.args.get('title')
    top_n = request.args.get('top_n', default=10, type=int)
    min_rating = request.args.get('min_rating', default=0, type=float)
    min_votes = request.args.get('min_votes', default=0, type=int)

    if not title:
        return jsonify({'error': 'Parâmetro "title" é obrigatório.'}), 400

    recommendations = engine.get_recommendations(title, top_n, min_rating, min_votes)

    if not recommendations:
        return jsonify({'error': 'Título não encontrado ou sem recomendações disponíveis.'}), 404

    return jsonify({'title': title, 'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True)
