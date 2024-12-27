from fastapi import FastAPI
import json
import os
from datetime import datetime

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")



data_file_path = os.path.join(os.path.dirname(__file__), "meteodaten_2023_daily.json")
# data_file_path = "https://3050fastapivercel.vercel.app/meteodaten_2023_daily.json"
with open(data_file_path, "r", encoding="utf-8") as f:
    data = json.load(f)




#Grafik aus VegaLite Templates
@app.get("/api/py/{location}")
def get_chart(location: str):
    filtered_data = [
        {"date": datetime.fromtimestamp(entry["Datum"] / 1000).strftime("%Y-%m-%d"), 
         "temperature": entry["T_max_h1"]}
        for entry in data if entry["Standort"] == location
    ]

    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": f"Scatterplot für {location}",
        "width": 400,
        "height": 300,
        "data": {"values": filtered_data},
        "mark": "line",
        "encoding": {
            "x": {"field": "date", "type": "temporal", "title": "Monat"},
            "y": {"field": "temperature", "type": "quantitative", "title": "Temperatur (°C)"}
        }
    }
