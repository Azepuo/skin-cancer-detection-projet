import tensorflow as tf
import numpy as np
import os

MODEL_PATH = "my_model.h5"

def test_model_responsiveness():
    if not os.path.exists(MODEL_PATH):
        print(f"Error: {MODEL_PATH} not found.")
        return

    print(f"Loading model from {MODEL_PATH}...")
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    
    # 1. Pure Black (0.0)
    black = np.zeros((1, 28, 28, 3))
    pred_black = model.predict(black)[0]
    
    # 2. Pure White (1.0)
    white = np.ones((1, 28, 28, 3))
    pred_white = model.predict(white)[0]
    
    # 3. Random Noise (0.0 - 1.0)
    noise = np.random.rand(1, 28, 28, 3)
    pred_noise = model.predict(noise)[0]
    
    # 4. Standardized Noise (aligned with backend code)
    std_noise = (noise - np.mean(noise)) / (np.std(noise) + 1e-7)
    pred_std_noise = model.predict(std_noise)[0]

    print("\n" + "="*30)
    print("MODEL STRESS TEST RESULTS")
    print("="*30)
    
    def print_result(name, pred):
        idx = np.argmax(pred)
        conf = pred[idx]
        print(f"{name:15}: Highest Index={idx}, Confidence={conf:.6f}")
        # Print a snippet of the vector to check for identity
        print(f"   RAW FULL: {list(np.round(pred, 5))}")

    print_result("BLACK", pred_black)
    print_result("WHITE", pred_white)
    print_result("NOISE", pred_noise)
    print_result("STD NOISE", pred_std_noise)
    
    # Check for identical outputs
    if np.allclose(pred_black, pred_white, atol=1e-5) and np.allclose(pred_white, pred_noise, atol=1e-5):
        print("\n[CRITICAL ERROR] The model is outputting identical results for ALL inputs.")
        print("This means the model is 'Dead' or 'Collapsed'. It will never work in its current state.")
    else:
        print("\n[SUCCESS] The model is responding to different inputs.")
        print("The numbers vary, so it is alive. We just need perfect preprocessing.")

if __name__ == "__main__":
    test_model_responsiveness()
