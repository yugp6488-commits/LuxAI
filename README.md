# LuxAI Project Pipeline 🚀

Welcome to the LuxAI project repository! This project combines video frame processing with a Machine Learning pipeline to deliver a comprehensive AI-powered application. 

This README provides step-by-step instructions on our workflow, from extracting frames from video to creating and saving our ML model using `joblib`.

## Table of Contents
1. [Video Frame Processing Pipeline](#1-video-frame-processing-pipeline)
2. [Machine Learning Model](#2-machine-learning-model)
3. [Proper Workflow & Execution](#3-proper-workflow--execution)
4. [Deployment](#4-deployment)

---

## 1. Video Frame Processing Pipeline

The visual component of this project requires extracting, processing, and recombining high-quality video frames.

### Step 1: Extract 30 FPS Frames
To process our video content (e.g., `drone-shot-of-luxury-home.mp4`), we extract frames at a rate of **30 frames per second (FPS)**. This ensures smooth playback and gives us a sufficient number of frames for any per-frame AI processing.
* **Tool recommendation:** You can use `ffmpeg` or Python's `OpenCV` to split the video into 30 FPS images.

### Step 2: Export and Process Frames in Software
Once you have the individual frames extracted (30 for each second of video):
* Import them into your chosen processing/editing software.
* Apply necessary visual adjustments, overlays, or annotations to the 30 frames.
* Export the processed frames back into a sequence directory (e.g., `/frames`).

### Step 3: Recompile into Video
After the frames have been processed and exported, they must be stitched back together into a continuous video.
* Use `ffmpeg` or your editing software to compile the image sequence back into an MP4 file, strictly maintaining the original 30 FPS frame rate so the timing aligns perfectly.

---

## 2. Machine Learning Model

Our backend utilizes a Machine Learning model (e.g., predicting property prices based on features like bedrooms, square footage, pool, etc.).

### Step 1: Model Creation and Training
* Navigate to the `backend/ml` directory.
* Train your model using your dataset (e.g., using `scikit-learn` for regression or classification).

### Step 2: Saving the Model via `joblib`
Once the model is properly trained and evaluated, it needs to be serialized so the backend can load it quickly for inference without retraining.
We use `joblib` for this, as it is highly efficient for Python objects containing large NumPy arrays.

```python
import joblib

# Assuming 'model' is your trained scikit-learn model
model_filename = 'trained_model.joblib'
joblib.dump(model, model_filename)
print(f"Model successfully saved to {model_filename}")
```

### Step 3: Loading the Model for Inference
In your production backend (e.g., inside `backend/ml/model.py`), load the saved `joblib` model to serve predictions via your API:

```python
import joblib

# Load the model
loaded_model = joblib.load('trained_model.joblib')

# Run prediction
prediction = loaded_model.predict(new_data)
```

---

## 3. Proper Workflow & Execution

To ensure the project works seamlessly, follow this unified workflow:

1. **Install Dependencies:**
   Make sure you have both frontend and backend dependencies installed.
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   pip install -r requirements.txt
   ```

2. **Run the ML Pipeline First:**
   * Execute your training script to generate the `trained_model.joblib` file.
   * Ensure it is placed in the correct directory accessible by the backend server.

3. **Process Media Assets:**
   * Extract your 30 FPS frames from the source drone video.
   * Edit and re-export the frames.
   * Recompile them into the final video file for the frontend to consume.

4. **Start the Applications:**
   * Start the backend API server (e.g., FastAPI/Flask) that loads the `joblib` model.
   * Start the React frontend (`npm run dev`) to view the UI and video components.

---
*Note: Make sure all assets, such as the compiled videos and the saved `joblib` models, are tracked properly (using tools like DVC or Git LFS if files are large) or excluded via `.gitignore` if they are dynamically generated.*

---

## 4. Deployment

Deploying the LuxAI project involves hosting both the frontend (React) and backend (Python) services.

### Frontend Deployment (React/Vite/Next.js)
The frontend can be easily deployed using static hosting platforms such as Vercel, Netlify, or AWS S3.
1. Build the production assets:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the generated `dist/` or `build/` directory to your chosen hosting provider.

### Backend Deployment (FastAPI/Flask)
The backend requires a server capable of running Python and serving the ML inference endpoint.
1. Popular options include Render, Heroku, AWS (EC2/Elastic Beanstalk), or a Docker container deployed to Google Cloud Run.
2. Example using `uvicorn` (if using FastAPI) in production:
   ```bash
   cd backend
   uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
   ```
3. **Important**: Ensure your `trained_model.joblib` is either built into your deployment image or downloaded from a secure bucket (like AWS S3) at startup, as hosting services often have ephemeral file systems.
