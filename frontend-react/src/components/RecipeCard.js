import React, { useState } from 'react';
import { Clock, Globe2, BookOpen, Award, ChefHat, Users } from 'lucide-react';

export default function RecipeCard({ recipe }) {
  const [showModal, setShowModal] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-emerald-500';
      case 'medium':
        return 'text-amber-500';
      case 'hard':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <>
      <div className="recipe-card">
        <div className="recipe-card-content">
          <div className="recipe-header">
            <h4 className="recipe-title">{recipe.name}</h4>
            <Award className="recipe-award" size={28} />
          </div>

          <div className="recipe-info">
            <div className="info-item">
              <Globe2 size={20} />
              <span>{recipe.cuisine_type}</span>
            </div>
            
            
          </div>

          
          <div className="text-sm text-gray-600 mt-2">
            <p>
              <Clock size={16} className="inline mr-1" />
              Cooking Time: {recipe.cooking_time} mins
            </p>
            <p>
              <ChefHat size={16} className={`inline mr-1 ${getDifficultyColor(recipe.difficulty)}`} />
              Difficulty: {recipe.difficulty}
            </p>
            <p>
              <Users size={16} className="inline mr-1" />
              Serves: {recipe.serve_size}
            </p>
          </div>

          <button
            className="view-recipe-button"
            onClick={() => setShowModal(true)}
          >
            <BookOpen size={20} />
            <span>View Recipe</span>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="recipe-modal">
            <div className="modal-header">
              <h3>{recipe.name}</h3>
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="recipe-stats">
                <div className="stat-item">
                  <Clock size={24} />
                  <span>{recipe.cooking_time} mins</span>
                </div>
                <div className="stat-item">
                  <ChefHat size={24} className={getDifficultyColor(recipe.difficulty)} />
                  <span className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</span>
                </div>
                <div className="stat-item">
                  <Users size={24} />
                  <span>Serves {recipe.serve_size}</span>
                </div>
              </div>

              <div className="recipe-section">
                <h4>Ingredients</h4>
                <p>{recipe.ingredients}</p>
              </div>

              <div className="recipe-section">
                <h4>Instructions</h4>
                <p>{recipe.instructions}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
