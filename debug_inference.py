import tensorflow as tf
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "my_model.h5")

print(f"Loading model from {MODEL_PATH}...")
try:
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    print("Model loaded successfully.")
    
    # Test 1: Zeros
    zeros = np.zeros((1, 28, 28, 3))
    res1 = model.predict(zeros)
    print(f"Prediction for Zeros: {res1}")
    
    # Test 2: Ones
    ones = np.ones((1, 28, 28, 3))
    res2 = model.predict(ones)
    print(f"Prediction for Ones: {res2}")
    
    # Test 3: Random
    rand = np.random.rand(1, 28, 28, 3)
    res3 = model.predict(rand)
    print(f"Prediction for Random: {res3}")
    
    # Check if they are all the same
    if np.allclose(res1, res2) and np.allclose(res2, res3):
        print("WARNING: Model outputs are identical for different inputs!")
    else:
        print("Model outputs varied.")

except Exception as e:
    print(f"Error: {e}")
