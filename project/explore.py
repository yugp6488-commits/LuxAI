from sklearn.datasets import fetch_california_housing
import pandas as pd

value = fetch_california_housing()

data = pd.DataFrame(value.data, columns=value.feature_names)

data["price"] = value.target
print(data.shape)
print(data.head())

