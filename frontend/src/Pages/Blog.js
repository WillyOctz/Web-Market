import React, { useState } from 'react';
import axios from 'axios';
import '../globals.css'
import nutri from '../assets/images/nutrition-photo.jpg'

const Blog = () => {
    const [foodName, setFoodName] = useState('');
    const [nutrition, setNutrition] = useState(null);

    const handlePredict = async () => {
        try {
            const response = await axios.post('http://localhost:5000/predict', {
                food_name: foodName,
            });
            setNutrition(response.data.prediction);
        } catch (error) {
            console.error('Error predicting nutrition:', error);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-1/5 bg-white p-6 border-r rounded-lg border-gray-200 ml-3 bg-gradient-to-r from-blue-200 to-cyan-200">
                <h3 className="text-xl font-semibold mb-4">Navigation</h3>
                <ul className="space-y-3">
                    <li><a href="#introduction" className="text-blue-500 hover:text-blue-700">Introduction</a></li>
                    <li><a href="#how-it-works" className="text-blue-500 hover:text-blue-700">How It Works</a></li>
                    <li><a href="#predictor" className="text-blue-500 hover:text-blue-700">Nutrition Predictor</a></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-4/5 p-8">
                {/* Title */}
                <h1 id="introduction" className="text-4xl font-bold text-center mb-8">
                    Nutrition Predictor Blog
                </h1>

                {/* Image */}
                <img
                    src={nutri}
                    alt="Nutrition Predictor"
                    className="w-full h-64 object-cover rounded-lg mb-8"
                />

                {/* Explanation */}
                <div id="how-it-works" className="bg-gradient-to-r from-teal-200 to-teal-500 p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                    <p className="text-gray-700">
                        The Nutrition Predictor is a tool that uses machine learning to estimate the nutritional content of various foods. 
                        By entering the name of a food item, the predictor analyzes the input and provides an estimated breakdown of key 
                        nutrients such as calories, proteins, fats, and carbohydrates. This tool is designed to help individuals make 
                        informed dietary choices based on the nutritional information provided.
                    </p>
                </div>

                {/* Predictor Section */}
                <div id="predictor" className="bg-gradient-to-r from-teal-200 to-teal-500 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Check It Out!</h2>
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                            placeholder="Enter food name"
                            className="flex-1 p-2 border border-gray-300 rounded-lg mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handlePredict}
                            className="button-33"
                        >
                            Predict
                        </button>
                    </div>

                    {/* Nutrition Results */}
                    {nutrition && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Nutrition Facts:</h3>
                            <ul className="space-y-1">
                                {Object.entries(nutrition).map(([nutrient, value]) => (
                                    <li key={nutrient} className="text-gray-700">
                                        <span className="font-medium">{nutrient}:</span> {value.toFixed(2)} mg
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blog;