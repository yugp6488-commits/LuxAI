from pydantic import BaseModel
import random

class HouseFeatures(BaseModel):
    bedrooms: int
    bathrooms: float
    living_sqft: int
    pool: bool
    garden: bool
    parking_spaces: int

def predict_price(features: HouseFeatures) -> float:
    # A mock prediction model that loosely correlates with features
    base_price = 500000
    
    price = base_price
    price += features.bedrooms * 50000
    price += features.bathrooms * 30000
    price += features.living_sqft * 400
    
    if features.pool:
        price += 100000
    if features.garden:
        price += 75000
        
    price += features.parking_spaces * 25000
    
    # Add a little randomness for "realism" (-2% to +2%)
    variation = price * random.uniform(-0.02, 0.02)
    price += variation
    
    return round(price, 2)
