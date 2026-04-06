# Running the Skin Cancer Detection Project

This project consists of a **FastAPI backend** and a **React (Vite) frontend**.

## 🚀 Quick Start

### 1. Start the Backend (FastAPI)
Open a terminal in the project root and run:
```bash
# Navigate to backend 
cd backend

# Install dependencies if you haven't (do this only once)
pip install -r requirements_backend.txt

# Start the FastAPI server
python main.py
```
- **Backend URL**: `http://localhost:8000`
- **Docs**: `http://localhost:8000/docs`

### 2. Start the Frontend (React + Vite)
Open a **new** terminal in the project root and run:
```bash
# Navigate to frontend
cd frontend

# Install dependencies (do this only once)
npm install

# Start the Vite development server
npm run dev
```
- **Frontend URL**: `http://localhost:5173`

## 🧪 Testing the Model
1. Open `http://localhost:5173` in your browser.
2. Drag and drop a skin lesion image (or click to upload).
3. Click **Analyze Image**.
4. You will see the top prediction along with a detailed probability breakdown of all 7 lesion types.

---
**Note**: Ensure `my_model.h5` is in the root directory as it is loaded by the backend.
