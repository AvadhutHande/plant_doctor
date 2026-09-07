"""
Plant Doctor — Disease Detection API
======================================

Wraps the HuggingFace pretrained model in a simple REST endpoint
so the mobile app can just POST a photo and get a diagnosis back.

Setup:
    pip install fastapi uvicorn transformers torch pillow python-multipart

Run:
    uvicorn app:app --host 0.0.0.0 --port 8000

Test:
    curl -X POST -F "file=@leaf.jpg" http://localhost:8000/predict
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from PIL import Image
import io

app = FastAPI(title="Plant Doctor - Disease Detection API")

# Allow the React dev server to call this API. Restrict allow_origins to
# your actual frontend URL before deploying to production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup (not per-request — that would be slow)
print("Loading model...")
classifier = pipeline(
    "image-classification",
    model="linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification",
)
print("Model loaded.")

# Minimum confidence before we trust the prediction enough to show it
CONFIDENCE_THRESHOLD = 0.5

# Map raw dataset labels (e.g. "Tomato___Late_blight") to friendly names.
# Extend this with every class the model actually outputs — check the model
# card's label list on the HuggingFace page for the full set.
LABEL_MAP = {
    "Tomato___Late_blight": {
        "name": "Tomato Late Blight",
        "advice": "Remove and destroy infected leaves. Apply a copper-based fungicide. Avoid overhead watering.",
    },
    "Tomato___healthy": {
        "name": "Healthy Tomato Plant",
        "advice": "No action needed. Keep up regular watering and monitoring.",
    },
    "Apple___Apple_scab": {
        "name": "Apple Scab",
        "advice": "Prune to improve air circulation. Apply fungicide in early spring before symptoms appear.",
    },
    "Apple___Black_rot": {
        "name": "Apple Black Rot",
        "advice": "Remove mummified fruit and cankers. Apply fungicide during the growing season.",
    },
    "Apple___healthy": {
        "name": "Healthy Apple Plant",
        "advice": "No action needed.",
    },
    # TODO: add remaining classes from the model's full label list
}


def humanize_label(raw_label: str) -> dict:
    """Look up friendly name/advice, or fall back to a cleaned-up raw label."""
    if raw_label in LABEL_MAP:
        return LABEL_MAP[raw_label]
    fallback_name = raw_label.replace("___", " - ").replace("_", " ")
    return {"name": fallback_name, "advice": "Consult a local agricultural expert for treatment options."}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Could not read image file.")

    predictions = classifier(image)  # list of {"label": ..., "score": ...}, sorted by confidence
    top = predictions[0]

    # Raw label/score pairs, unmodified — the frontend's own parseLabel()
    # and remedy lookup logic uses these directly.
    raw_predictions = [{"label": p["label"], "score": p["score"]} for p in predictions[:3]]

    if top["score"] < CONFIDENCE_THRESHOLD:
        return {
            "status": "uncertain",
            "message": "Unable to confidently identify a disease. Try a clearer, closer photo of the affected leaf.",
            "raw_top_guess": top["label"],
            "confidence": round(top["score"], 3),
            "raw_predictions": raw_predictions,
        }

    info = humanize_label(top["label"])
    return {
        "status": "ok",
        "disease": info["name"],
        "advice": info["advice"],
        "confidence": round(top["score"], 3),
        "raw_label": top["label"],
        "raw_predictions": raw_predictions,
        "alternatives": [
            {"label": humanize_label(p["label"])["name"], "confidence": round(p["score"], 3)}
            for p in predictions[1:4]  # next 3 possibilities, useful for a "did you mean" UI
        ],
    }


@app.get("/health")
async def health():
    return {"status": "up"}
