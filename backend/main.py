import os
import numpy as np
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from PIL import Image
import tensorflow as tf
import io
import time
import shutil

from database import engine, Base, get_db
import models
from routes import auth, analysis
from auth import get_current_user
from sqlalchemy.orm import Session

# Create database tables
Base.metadata.create_all(bind=engine)

# Ensure uploads directory exists
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI(title="Skin Cancer Detection API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Authentication Routes
app.include_router(auth.router, prefix="/api")
app.include_router(analysis.router, prefix="/api")

# Serve uploaded images
app.mount("/api/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Load the model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "my_model.h5")
try:
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    print(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

from PIL import Image, ImageOps

def center_crop_image(img):
    """Crops the center of the image to a square."""
    width, height = img.size
    new_size = min(width, height)
    left = (width - new_size) / 2
    top = (height - new_size) / 2
    right = (width + new_size) / 2
    bottom = (height + new_size) / 2
    return img.crop((left, top, right, bottom))

# Labels mapping based on HAM10000 categorical indices
# Standard MNIST-style 28x28 mapping:
# 0: akiec, 1: bcc, 2: bkl, 3: df, 4: nv, 5: vasc, 6: mel
LABELS = [
    {"id": "akiec", "name": "Actinic Keratoses", "description": "Precancerous skin lesions typically caused by sun exposure."},
    {"id": "bcc", "name": "Basal Cell Carcinoma", "description": "The most common type of skin cancer, usually non-spreading."},
    {"id": "bkl", "name": "Benign Keratosis-like Lesions", "description": "Non-cancerous growths like seborrheic keratoses."},
    {"id": "df", "name": "Dermatofibroma", "description": "A common benign skin growth, often firm and small."},
    {"id": "nv", "name": "Melanocytic Nevi", "description": "Common moles, usually benign but should be monitored."},
    {"id": "vasc", "name": "Vascular Lesions", "description": "Growths related to blood vessels, typically benign."},
    {"id": "mel", "name": "Melanoma", "description": "A serious form of skin cancer that begins in pigment-producing cells."}
]

@app.get("/")
def read_root():
    return {"status": "online", "model_loaded": model is not None}

@app.post("/api/predict")
async def predict(
    file: UploadFile = File(...),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded on server.")
    
    try:
        # Read the image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Save the original image to uploads folder
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{current_user.id}_{int(time.time())}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        # Write the file to disk
        with open(file_path, "wb") as buffer:
            buffer.write(contents)
            
        # 1. Center crop to focus on the lesion
        image = center_crop_image(image)
        
        # 2. Enhance contrast so the AI can see edges/textures better
        image = ImageOps.autocontrast(image)
        
        # 3. Resize to 28x28 with high quality LANCZOS filter
        image = image.resize((28, 28), Image.Resampling.LANCZOS)
        
        # 4. Standardize to match the AI's sensitive pixel range
        img_array = np.array(image).astype(np.float32) / 255.0
        
        # We subtract the mean and divide by std of THIS specific image.
        # This removes bias from different camera lighting.
        for i in range(3):
            m = np.mean(img_array[:, :, i])
            s = np.std(img_array[:, :, i])
            if s > 0:
                img_array[:, :, i] = (img_array[:, :, i] - m) / s
        
        # Debug: log image statistics
        print(f"Standardized Image statistics - Mean: {np.mean(img_array):.4f}, Std: {np.std(img_array):.4f}")
        
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        
        # Perform prediction
        predictions = model.predict(img_array)
        scores = predictions[0].tolist()
        
        # Log to server console for monitoring
        print(f"MODEL RAW SCORES: {list(np.round(scores, 5))}")
        
        # Get the highest confidence index
        predicted_idx = np.argmax(scores)
        result = LABELS[predicted_idx]
        
        # Prepare response with all scores for visualization
        all_results = []
        for i, score in enumerate(scores):
            all_results.append({
                "label": LABELS[i]["name"],
                "confidence": float(score),
                "description": LABELS[i].get("description", "")
            })
            
        # Sort by confidence
        all_results.sort(key=lambda x: x["confidence"], reverse=True)
            
        # 5. Save Analysis to Database
        db_analysis = models.Analysis(
            user_id=current_user.id,
            image_path=unique_filename,
            prediction=result["name"],
            confidence=float(scores[predicted_idx]),
            all_scores=all_results
        )
        db.add(db_analysis)
        db.commit()
        db.refresh(db_analysis)

        return {
            "id": db_analysis.id,
            "prediction": result["name"],
            "confidence": float(scores[predicted_idx]),
            "description": result.get("description", ""),
            "all_scores": all_results,
            "image_url": f"/uploads/{unique_filename}"
        }
        
    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=400, detail=f"Invalid image file: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
