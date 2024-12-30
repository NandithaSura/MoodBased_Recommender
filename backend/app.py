from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from pathlib import Path
import sqlite3
import json

app = Flask(__name__)
CORS(app)

sentiment_analyzer = pipeline(
    "text-classification",
    model="nlptown/bert-base-multilingual-uncased-sentiment",
    top_k=None
)

MOOD_KEYWORDS = {
    'happy': ['happy', 'joy', 'excited', 'great', 'wonderful', 'cheerful', 'delighted', 'pleased', 'content'],
    'sad': ['sad', 'down', 'depressed', 'unhappy', 'blue', 'gloomy', 'miserable', 'heartbroken'],
    'stressed': ['stressed', 'anxious', 'worried', 'nervous', 'tense', 'overwhelmed', 'pressured', 'frazzled'],
    'relaxed': ['relaxed', 'calm', 'peaceful', 'chill', 'content', 'serene', 'tranquil', 'easy-going'],

}

def get_db_connection():
    db_path = Path(__file__).parent / "data" / "recipes.db"
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row  
    return conn

def get_recipes_by_mood(mood):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute(
        "SELECT * FROM recipes WHERE associated_moods LIKE ?", 
        [f'%{mood}%']
    )
    recipes = cursor.fetchall()
    conn.close()
    
    return [dict(recipe) for recipe in recipes]

def analyze_sentiment(text):
    try:
        text = text.lower()
        
        for mood, keywords in MOOD_KEYWORDS.items():
            if any(keyword in text for keyword in keywords):
                return mood
        
        sentiment_scores = sentiment_analyzer(text)[0]
        score = max(sentiment_scores, key=lambda x: x['score'])['label']
        
        score_num = int(score.split()[0])
        
        if score_num >= 4:
            return 'happy'
        elif score_num == 3:
            return 'relaxed'
        elif score_num <= 2:
            return 'sad'
        
        return 'relaxed'
    except Exception as e:
        print(f"Error in sentiment analysis: {e}")
        return 'relaxed'

@app.route('/')
def home():
    return jsonify({
        "status": "success",
        "message": "Welcome to the Mood & Food API!",
        "endpoints": {
            "/api/analyze-mood": "POST - Analyze mood from text",
            "/api/recipes/<mood>": "GET - Get recipes for a specific mood"
        }
    })

@app.route('/api/analyze-mood', methods=['POST'])
def analyze_mood():
    try:
        data = request.json
        mood_text = data.get('mood_description', '')
        if not mood_text:
            return jsonify({'error': 'No mood description provided'}), 400
        
        detected_mood = analyze_sentiment(mood_text)
        return jsonify({
            'status': 'success',
            'mood': detected_mood,
            'message': f'Detected mood: {detected_mood}'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/recipes/<mood>', methods=['GET'])
def get_recipes(mood):
    try:
        recipes_list = get_recipes_by_mood(mood)
        
        if not recipes_list:
            return jsonify([])
        
      
        formatted_recipes = []
        for recipe in recipes_list:
            formatted_recipes.append({
                'id': recipe['id'],
                'name': recipe['name'],
                'cuisine_type': recipe['cuisine_type'],
                'ingredients': recipe['ingredients'].split(','),
                'instructions': recipe['instructions'].split('\n'),
                'cooking_time': recipe['cooking_time'],
                'difficulty': recipe['difficulty'],
                'serve_size': recipe['serve_size']
            })
            
        return jsonify(formatted_recipes)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)