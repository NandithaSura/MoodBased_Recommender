import React, { useState } from 'react';
import { Smile, Search, Sparkles } from 'lucide-react';

export default function MoodInput({ onSubmit, loading }) {
  const [moodDescription, setMoodDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(moodDescription);
  };

  const motivationalQuotes = [
    "Your mood deserves the perfect recipe!",
    "Let's cook something amazing together",
    "Food that matches your spirit"
  ];

  return (
    <div className="mood-input-container">
      <div className="mood-card">
        <div className="mood-card-inner">
          <div className="mood-header">
            <div className="mood-icon-container">
              <div className="mood-icon-circle">
                <Smile size={48} className="mood-icon" />
                <Sparkles size={24} className="sparkle-icon" />
              </div>
            </div>
            <h2 className="mood-title">How are you feeling today?</h2>
            <p className="mood-subtitle">{motivationalQuotes[0]}</p>
          </div>

          <form onSubmit={handleSubmit} className="mood-form">
            <div className="textarea-container">
              <textarea
                className="mood-textarea"
                rows="4"
                value={moodDescription}
                onChange={(e) => setMoodDescription(e.target.value)}
                placeholder="Express yourself freely... (e.g., 'Feeling joyful and energetic!')"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  <span>Finding perfect recipes...</span>
                </>
              ) : (
                <>
                  <Search size={24} />
                  <span>Discover Mood-Perfect Recipes</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}