import React, { useState } from 'react';
import { Coffee, Heart } from 'lucide-react';
import MoodInput from './components/MoodInput';
import RecipeCard from './components/RecipeCard';
import './styles.css';

const moodQuotes = {
  happy: [
    "Let's cook up some joy together! 🌟",
    "Your cheerful energy makes the perfect seasoning! ✨",
    "Time to make something as bright as your mood! 🌈",
    "Let's celebrate with something delicious! 🎉",
    "Your happiness is contagious - let's spread it through food! 😊"
  ],
  sad: [
    "Comfort food coming right up! 🤗",
    "Let's cook something that feels like a warm hug 💝",
    "Sometimes the best therapy is in the kitchen 🍪",
    "We'll make something to lift your spirits 🌅",
    "Food has a way of making everything feel a little better 💫"
  ],
  stressed: [
    "Time for some therapeutic cooking 🍳",
    "Let's channel that energy into something delicious 🌿",
    "Cooking can be a wonderful stress reliever 🧘‍♀️",
    "The kitchen is your calm space today 🌸",
    "Mindful cooking helps clear the mind ✨"
  ],
  relaxed: [
    "Perfect mood for culinary adventures! 😊",
    "Let's take our time and enjoy the process 🌺",
    "Your calm energy will make everything taste better 🌟",
    "Time to experiment with new flavors! 🌿",
    "The kitchen welcomes your peaceful vibes 🍃"
  ],
  energetic: [
    "Let's channel that energy into something amazing! ⚡",
    "Time to tackle that challenging recipe you've been eyeing! 💪",
    "Your enthusiasm will make this dish spectacular! 🎨",
    "Let's create something as vibrant as your spirit! 🌟",
    "Perfect time for a cooking adventure! 🚀"
  ],
  tired: [
    "Let's keep it simple and satisfying today 🌙",
    "Easy comfort food coming right up 🍲",
    "We'll make something nourishing without too much effort 🫶",
    "Simple ingredients, maximum comfort 🥄",
    "Let's restore your energy with some good food 🌟"
  ],
  hungry: [
    "Let's satisfy that appetite with something special! 🍽️",
    "Time to cook up a feast! 🎉",
    "Your hunger is the perfect inspiration 🌟",
    "Get ready for something deliciously satisfying 😊",
    "We'll make this worth the wait! ✨"
  ],
  romantic: [
    "Let's cook up something as special as love itself 💝",
    "Time to add a dash of romance to your cooking! 💫",
    "Let's make something to spark joy and love 💖",
    "Perfect mood for an intimate culinary journey 🌹",
    "Love makes everything taste better 💕"
  ],
  adventurous: [
    "Time to explore new flavors and techniques! 🌎",
    "Let's push your culinary boundaries today! 🚀",
    "Your adventurous spirit will make this exciting! 🌟",
    "Perfect time to try something new! 🎯",
    "Let's embark on a tasty adventure! 🗺️"
  ],
  creative: [
    "Let your imagination guide you in the kitchen today! 🎨",
    "Time to put your creative spin on things! ✨",
    "Your creativity will make this dish unique! 🌈",
    "Perfect mood for culinary innovation! 💫",
    "Let's create something extraordinary! 🌟"
  ],
  social: [
    "Cooking is better when shared! 🤝",
    "Let's make something perfect for gathering! 🎉",
    "Time to cook up some memories together! 💖",
    "Food brings people together! 🌟",
    "Let's create something worth sharing! 🌺"
  ],
  mindful: [
    "Let's focus on each step with intention 🧘‍♀️",
    "Mindful cooking creates mindful meals 🌿",
    "Each ingredient has a story to tell ✨",
    "Let's appreciate every moment in the kitchen 🌸",
    "Cooking with presence makes food more meaningful 💫"
  ]
};

const getRandomQuote = (mood) => {
  if (moodQuotes[mood]) {
    const quotes = moodQuotes[mood];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  return "Let's cook something special! 🌟"; 
};

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [currentMood, setCurrentMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMoodSubmit = async (moodDescription) => {
    try {
      setLoading(true);
      setError('');

      const moodResponse = await fetch('http://localhost:5000/api/analyze-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood_description: moodDescription }),
      });

      if (!moodResponse.ok) throw new Error('Failed to analyze mood');
      const { mood } = await moodResponse.json();
      setCurrentMood(mood);

      const recipesResponse = await fetch(`http://localhost:5000/api/recipes/${mood}`);
      if (!recipesResponse.ok) throw new Error('Failed to fetch recipes');

      const recipesData = await recipesResponse.json();
      setRecipes(recipesData);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient">
        <div className="container py-2">
          <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
  <Coffee style={{ color: 'yellow' }} className="me-2" size={32} />
  <span className="navbar-brand fs-4 fw-bold mb-0" style={{ color: 'white' }}>MoodChef</span>
</div>
          </div>
          <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
  <Heart style={{ color: 'yellow' }} className="me-2" size={24} />
  <span className="text-white d-none d-md-inline" style={{ color: 'white' }}>Mood-Based Recipes</span>
</div>
          </div>
        </div>
      </nav>

      <div className="hero-section text-center text-white py-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Transform Your Mood Through Food</h1>
          <p className="lead fs-4 opacity-75">Let your emotions guide you to culinary excellence</p>
        </div>
      </div>

      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="position-relative" style={{ marginTop: '-3rem' }}>
              <MoodInput onSubmit={handleMoodSubmit} loading={loading} />
            </div>

            {error && (
              <div className="alert alert-danger mt-4" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>

        {currentMood && recipes.length > 0 && (
          <div className="mt-5 pt-4">
            <div className="text-center mb-5">
              <h3 className="display-6 fw-bold text-primary mb-3">
                Perfect Recipes for Your {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Mood
              </h3>
              <p className="lead text-muted">{getRandomQuote(currentMood)}</p>
            </div>

            <div className="row g-4">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="col-md-6 col-lg-4">
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}