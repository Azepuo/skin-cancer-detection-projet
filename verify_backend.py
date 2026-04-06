import requests
import os
import glob

API_URL = "http://localhost:8000/predict"

# Get some sample images
image_paths = glob.glob("HAM10000_images_part_1/*.jpg")[:5]

if not image_paths:
    print("No images found in HAM10000_images_part_1/")
else:
    for img_path in image_paths:
        print(f"\nTesting image: {img_path}")
        with open(img_path, "rb") as f:
            files = {"file": f}
            response = requests.post(API_URL, files=files)
            if response.status_code == 200:
                data = response.json()
                print(f"Prediction: {data['prediction']} (Confidence: {data['confidence']:.4f})")
            else:
                print(f"Error: {response.text}")
