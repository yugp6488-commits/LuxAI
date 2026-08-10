import io
import joblib 
import pandas as pd
from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel, Field
from fastapi.responses import StreamingResponse

app = FastAPI()

model = joblib.load("house_model.joblib")
feature = joblib.load("house_features.joblib")

class HouseFeatures(BaseModel):
    MedInc: float = Field(gt=0, description="Median Income of Neighbourhood")
    HouseAge: float = Field(ge=0, description="Average age of the house")
    AveRooms: float = Field(ge=0, description="Average room of the house")
    AveBedrms: float = Field(ge=0, description="Average bedrooms") 
    Population: float = Field(ge=0, description="Total population for the area")
    AveOccup: float = Field(ge=0, description="Average occupancy for the house")
    Latitude: float = Field(ge=32, le=42, description="Average latitude")
    Longitude: float = Field(ge=-125, le=-114, description="Average longitude")     

@app.get("/")
def home():
    return {
        "Message": "California house prediction api",
        "Status": "running",
        "endpoint": "Send POST request to /predict or /predict-file"
    }            

@app.get("/health")
def health():
    return {
        "Status": "running",
        "model": "RandomForestRegression",
        "feature": feature,
        "Avg_error": "$39,000"
    }

@app.post("/predict")
def predict(house: HouseFeatures):
    try:
        input_data = pd.DataFrame([{
            "MedInc": house.MedInc,
            "HouseAge": house.HouseAge,
            "AveRooms": house.AveRooms,
            "AveBedrms": house.AveBedrms,
            "Population": house.Population,
            "AveOccup": house.AveOccup,
            "Latitude": house.Latitude,
            "Longitude": house.Longitude,
        }])

        predicted = model.predict(input_data)[0]
        price_usd = predicted * 100000

        return {
            "predicted_price": f"${price_usd:,.0f}",
            "predicted_price_short": f"${predicted:,.2f} Hundred thousand",
            "confidence_range": f"${price_usd - 39000:,.0f} to ${price_usd + 39000:,.0f}"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )

@app.post("/predict-file")
async def predict_file(file: UploadFile = File(...)):
    
    # 1. Validate file extension
    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a CSV file only."
        )

    try:
        contents = await file.read()
        
        # 2. Parse CSV using pd.read_csv
        df = pd.read_csv(io.BytesIO(contents))

        # Check if DataFrame is empty
        if df.empty:
            raise HTTPException(
                status_code=400,
                detail="The uploaded CSV file contains no data rows."
            )

        # 3. Validate columns
        required_columns = [
            'MedInc', 'HouseAge', 'AveRooms', 'AveBedrms', 
            'Population', 'AveOccup', 'Latitude', 'Longitude'
        ]

        missing_columns = [col for col in required_columns if col not in df.columns]

        if missing_columns:
            raise HTTPException(
                status_code=400,
                detail=f"These required columns are missing from your file: {missing_columns}"
            )

        # 4. Generate predictions
        predictions = model.predict(df[required_columns])

        # 5. Add predictions as new columns
        df["predicted_price_usd"] = (predictions * 100000).round(2)

        # 6. Convert back to CSV string
        output = df.to_csv(index=False)

        # 7. Return StreamingResponse download stream
        return StreamingResponse(
            io.StringIO(output),
            media_type="text/csv",
            headers={
                "Content-Disposition": "attachment; filename=predictions.csv"
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"File processing or prediction failed: {str(e)}"
        )