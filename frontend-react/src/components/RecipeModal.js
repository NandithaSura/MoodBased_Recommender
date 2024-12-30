import React from 'react';
import  Dialog  from './ui/Dialog';

export default function RecipeModal({ recipe, show, onClose }) {
  if (!show) return null;

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full">
      
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-6 py-4">
          <h5 className="text-xl font-semibold flex items-center">
            <i className="fas fa-utensils mr-2"></i>
            {recipe.name}
          </h5>
        </div>

        
        <div className="p-6">
         
          <div className="mb-6">
            <h6 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b-2 border-blue-500">
              <i className="fas fa-shopping-basket mr-2 text-blue-500"></i>
              Ingredients
            </h6>
            <p className="whitespace-pre-line">{recipe.ingredients}</p>
          </div>

          
          <div className="mb-6">
            <h6 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b-2 border-blue-500">
              <i className="fas fa-list-ol mr-2 text-blue-500"></i>
              Instructions
            </h6>
            <p className="whitespace-pre-line">{recipe.instructions}</p>
          </div>

         
          {recipe.image && (
            <div className="mb-6">
              <h6 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b-2 border-blue-500">
                <i className="fas fa-image mr-2 text-blue-500"></i>
                Recipe Image
              </h6>
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-auto rounded-md shadow-lg"
              />
            </div>
          )}

          
          {recipe.nutrition && (
            <div className="mb-6">
              <h6 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b-2 border-blue-500">
                <i className="fas fa-info-circle mr-2 text-blue-500"></i>
                Nutrition Information
              </h6>
              <ul className="list-disc pl-6 text-gray-700">
                {Object.entries(recipe.nutrition).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

         
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}