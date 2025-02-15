import sys
import tensorflow as tf
import numpy as np
import pickle
import os
import json
from tensorflow.keras.preprocessing.sequence import pad_sequences
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

# Suppress TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress most TensorFlow logs
tf.get_logger().setLevel('ERROR')  # Suppress TensorFlow warnings

# Check for required modules
try:
    from sklearn.preprocessing import StandardScaler
except ImportError as e:
    print(json.dumps({"error": "Missing required module: sklearn. Install it using 'pip install scikit-learn'"}))
    sys.exit(1)

# Define custom loss function and metric
def custom_loss_function(y_true, y_pred):
    return tf.reduce_mean(tf.square(y_true - y_pred))

def r_squared(y_true, y_pred):
    residual = tf.reduce_sum(tf.square(y_true - y_pred))
    total = tf.reduce_sum(tf.square(y_true - tf.reduce_mean(y_true)))
    r2 = 1 - residual / (total + tf.keras.backend.epsilon())
    return r2

# Load model and tokenizer
model_path = 'C:/Users/User/market-web/backend/nutrition_model.h5'
if not os.path.exists(model_path):
    print(json.dumps({"error": "Model file not found"}))
    sys.exit(1)

try:
    model = tf.keras.models.load_model(model_path, custom_objects={
        'custom_loss_function': custom_loss_function,
        'r_squared': r_squared,
        'mse': tf.keras.losses.MeanSquaredError()  # Correct import path for mean_squared_error
    })
    with open('C:/Users/User/market-web/backend/tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    with open('C:/Users/User/market-web/backend/scaler.pickle', 'rb') as handle:
        scaler = pickle.load(handle)
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)

# Preprocess input
try:
    food_name = sys.argv[1]
except IndexError:
    print(json.dumps({"error": "No food name provided. Usage: python predict.py <food_name>"}))
    sys.exit(1)

seq = tokenizer.texts_to_sequences([food_name])
padded = pad_sequences(seq, maxlen=20, padding='post', truncating='post')

# Predict
try:
    prediction_scaled = model.predict(padded, verbose=0)  # Suppress prediction logs
    prediction = scaler.inverse_transform(prediction_scaled)
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)

# Return result
nutrients_name = ['Caloric Value', 'Fat', 'Saturated Fats', 'Monounsaturated Fats', 'Polyunsaturated Fats', 'Carbohydrates', 'Sugars', 'Protein']  # Replace with actual nutrient names
nutrition_dict = {str(nutrient): float(value) for nutrient, value in zip(nutrients_name, prediction[0])}  # Ensure keys are strings and values are floats

# Print only the JSON output
print(json.dumps(nutrition_dict))